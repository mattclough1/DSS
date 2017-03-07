import {
    singleLineComment,
    startMultiLineComment,
    endMultiLineComment,
    parseSingleLine,
    parseMultiLine,
    trim,
    size,
    normalize,
    getStrIndex,
    cleanLine
} from './util';

export default class DSS {
    constructor() {
        this.parsers = {};
        this.parse = this.parse.bind(this);
        this.detector = this.detector.bind(this);
        this.alias = this.alias.bind(this);
    }

    detect() {
        return true;
    }

    detector(callback) {
        this.detect = callback;
    }

    parser(name, callback) {
        this.parsers[name] = callback;
    }

    alias(newName, oldName) {
        this.parsers[newName] = this.parsers[oldName];
    }

    parseLine(_temp, line, block, file, from, to, options) {
        let temp = _temp;
        const parts = line.replace(/.*@/, '');
        const index = getStrIndex(parts, ' ') || getStrIndex(parts, '\n') || getStrIndex(parts, '\r') || parts.length;
        const name = trim(parts.substr(0, index));
        const output = {
            options,
            file,
            name,
            line: {
                contents: trim(parts.substr(index), [], 'trimming from output'),
                from: block.indexOf(line),
                to: block.indexOf(line)
            },
            block: {
                contents: block,
                from,
                to
            }
        };

        // find the next instance of a parser (if there is one based on the @ symbol)
        // in order to isolate the current multi-line parser
        const nextParserIndex = block.indexOf('* @', output.line.from + 1);
        const markupLength = (nextParserIndex > -1) ? nextParserIndex - output.line.from : block.length;
        const parserMarker = `@${name}`;
        const contents = block.split('').splice(output.line.from, markupLength).join('').replace(parserMarker, '');

        // Redefine output contents to support multiline contents
        output.line.contents = cleanLine(contents, parserMarker);

        const newLine = {};
        newLine[name] = (this.parsers[name]) ? this.parsers[name].call(output, output) : '';

        if (temp[name]) {
            if (!Array.isArray(temp[name])) {
                temp[name] = [temp[name]];
            }
            if (!Array.isArray(line[name])) {
                temp[name].push(line[name]);
            } else {
                temp[name].push(line[name][0]);
            }
        } else {
            temp = Object.assign({}, temp, line);
        }
        return temp;
    }

    parse(lines, options = {}, callback) {
        // Options
        // options.preserveWhitespace = !!(options.preserveWhitespace);

        // Setup
        let currentBlock = '';
        let insideSingleLineBlock = false;
        let insideMultiLineBlock = false;
        let lastLine;
        // const start = '{start}';
        // const end = '{/end}';
        let _parsed = false;
        const _blocks = [];
        let parsed = '';
        const blocks = [];
        let temp = {};
        let lineNum = 0;
        let from = 0;
        let to = 0;

        lines.toString().split(/\n/).forEach((line) => {
            // Increment line number and ensure line is treated as a string
            lineNum++;

            // Store starting line number
            if (singleLineComment(line) || startMultiLineComment(line)) {
                from = lineNum;
            }

            // Parse Single line comment
            if (singleLineComment(line)) {
                parsed = parseSingleLine(line);
                if (insideSingleLineBlock) {
                    currentBlock += `\n${parsed}`;
                } else {
                    currentBlock = parsed;
                    insideSingleLineBlock = true;
                }
            }

            // Parse multi-line comments
            if (startMultiLineComment(line) || insideMultiLineBlock) {
                parsed = parseMultiLine(line);
                if (insideMultiLineBlock) {
                    currentBlock += `\n${parsed}`;
                } else {
                    currentBlock += parsed;
                    insideMultiLineBlock = true;
                }
            }

            // End a multi-line block
            if (endMultiLineComment(line)) {
                insideMultiLineBlock = false;
            }

            // Store current block if done
            if (!singleLineComment(line) && !insideMultiLineBlock) {
                if (currentBlock) {
                    _blocks.push({ text: normalize(currentBlock), from, to: lineNum });
                }
                insideSingleLineBlock = false;
                currentBlock = '';
                lastLine = '';
            }
        });

        // Done first pass
        _parsed = true;

        // Create new blocks with custom parsing
        _blocks.forEach((_block) => {
            // Store line numbers
            from = _block.from;
            to = _block.to;

            // Remove extra whitespace
            console.log(_block, '_block');
            const block = _block.text.split('\n').filter((line) => {
                console.log(normalize(line), 'normalized line');
                return trim(normalize(line))
            }).join('\n');
            console.log(block, 'block');
            // const block = _block.text.split('\n').filter(line => (
            //     trim(normalize(line))
            // )).join('\n');

            // Split block into lines
            block.split('\n').forEach((line) => {
                if (this.detect(line)) {
                    temp = this.parseLine(temp, normalize(line), block, lines, from, to, options);
                }
            });

            // Push to blocks if object isn't empty
            if (size(temp)) {
                blocks.push(temp);
            }
            temp = {};
        });

        // Execute callback with filename and blocks
        callback({ blocks });
    }
}

// // DSS Object
// var dss = ( function () {
//
//   // Store reference
//   var _dss = function () {};
//
//   // Store parsers
//   _dss.parsers = {};
//
//   // Default detect function
//   _dss.detect = function () {
//     return true;
//   };
//
//   /*
//    * Modify detector method
//    *
//    * @param (Function) The callback to be used to detect variables
//    */
//   _dss.detector = function ( callback ) {
//     _dss.detect = callback;
//   };
//
//   /*
//    * Add a parser for a specific variable
//    *
//    * @param (String) The name of the variable
//    * @param (Function) The callback to be executed at parse time
//    */
//   _dss.parser = function ( name, callback ) {
//     _dss.parsers[ name ] = callback;
//   };
//
//   /*
//    * Add an alias for a parser
//    *
//    * @param (String) The name of the new variable
//    * @param (String) The name of the existing parser to use
//    */
//   _dss.alias = function ( newName, oldName ) {
//     _dss.parsers[ newName ] = _dss.parsers[ oldName ];
//   };
//
//   /*
//    * Trim whitespace from string
//    *
//    * @param (String) The string to be trimmed
//    * @return (String) The trimmed string
//    */
//   _dss.trim = function ( str, arr ) {
//     var defaults = [ /^\s\s*/, /\s\s*$/ ];
//     arr = ( _dss.isArray( arr ) ) ? arr.concat( defaults ) : defaults;
//     arr.forEach( function( regEx ) {
//       str = str.replace( regEx, '' );
//     } );
//     return str;
//   };
//
//   /*
//    * Check if object is an array
//    *
//    * @param (Object) The object to check
//    * @return (Boolean) The result of the test
//    */
//   _dss.isArray = function ( obj ) {
//     return toString.call( obj ) == '[object Array]';
//   };
//
//   /*
//    * Check the size of an object
//    *
//    * @param (Object) The object to check
//    * @return (Boolean) The result of the test
//    */
//   _dss.size = function ( obj ) {
//     var size = 0;
//     for ( var key in obj ) {
//       if ( Object.prototype.hasOwnProperty.call( obj, key ) )
//         size++;
//     }
//     return size;
//   };
//
//   /*
//    * Iterate over an object
//    *
//    * @param (Object) The object to iterate over
//    * @param (Function) Callback function to use when iterating
//    * @param (Object) Optional context to pass to iterator
//    */
//   _dss.each = function ( obj, iterator, context ) {
//     if ( obj == null ) {
//       return;
//     }
//     if ( obj.length === +obj.length ) {
//       for ( var i = 0, l = obj.length; i < l; i++ ) {
//         if ( iterator.call( context, obj[ i ], i, obj ) === {} ) {
//           return;
//         }
//       }
//     } else {
//       for ( var key in obj ) {
//         if ( _.has( obj, key ) ) {
//           if ( iterator.call( context, obj[ key ], key, obj ) === {} ) {
//             return;
//           }
//         }
//       }
//     }
//   };
//
//   /*
//    * Extend an object
//    *
//    * @param (Object) The object to extend
//    */
//   _dss.extend = function ( obj ) {
//     _dss.each( Array.prototype.slice.call( arguments, 1 ), function ( source ) {
//       if ( source ) {
//         for ( var prop in source ) {
//           obj[ prop ] = source[ prop ];
//         }
//       }
//     });
//     return obj;
//   };
//
//   /*
//    * Squeeze unnecessary extra characters/string
//    *
//    * @param (String) The string to be squeeze
//    * @param (String) The string to be matched
//    * @return (String) The modified string
//    */
//   _dss.squeeze = function ( str, def ) {
//     return str.replace( /\s{2,}/g, def );
//   };
//
//   /*
//    * Normalizes the comment block to ignore any consistent preceding
//    * whitespace. Consistent means the same amount of whitespace on every line
//    * of the comment block. Also strips any whitespace at the start and end of
//    * the whole block.
//    *
//    * @param (String) Text block
//    * @return (String) A cleaned up text block
//    */
//   _dss.normalize = function ( text_block ) {
//
//     // Strip out any preceding [whitespace]* that occurs on every line
//     text_block = text_block.replace( /^(\s*\*+)/, '' );
//
//     // Strip consistent indenting by measuring first line's whitespace
//     var indent_size = false;
//     var unindented = ( function ( lines ) {
//       return lines.map( function ( line ) {
//         var preceding_whitespace = line.match( /^\s*/ )[ 0 ].length;
//         if ( !indent_size ) {
//           indent_size = preceding_whitespace;
//         }
//         if ( line == '' ) {
//           return '';
//         } else if ( indent_size <= preceding_whitespace && indent_size > 0 ) {
//           return line.slice( indent_size, ( line.length - 1 ) );
//         } else {
//           return line;
//         }
//       } ).join( "\n" );
//     } )( text_block.split( "\n" ) );
//
//     return _dss.trim( text_block );
//
//   };
//
//   /*
//    * Takes a file and extracts comments from it.
//    *
//    * @param (Object) options
//    * @param (Function) callback
//    */
//   _dss.parse = function ( lines, options, callback ) {
//
//     // Options
//     options = ( options ) ? options : {};
//     options.preserve_whitespace = !!( options.preserve_whitespace );
//
//     // Setup
//     var current_block             = '';
//     var inside_single_line_block  = false;
//     var inside_multi_line_block   = false;
//     var last_line                 = '';
//     var start                     = '{start}';
//     var end                       = '{/end}';
//     var _parsed                   = false;
//     var _blocks                   = [];
//     var parsed                    = '';
//     var blocks                    = [];
//     var temp                      = {};
//     var lineNum                   = 0;
//     var from                      = 0;
//     var to                        = 0;
//
//     lines = lines + '';
//     lines.split( /\n/ ).forEach( function ( line ) {
//
//       // Iterate line number and ensure line is treaty as a string
//       lineNum = lineNum + 1;
//       line = line + '';
//
//       // Store starting line number
//       if ( single_line_comment( line ) || start_multi_line_comment( line ) ) {
//         from = lineNum;
//       }
//
//       // Parse Single line comment
//       if ( single_line_comment( line ) ) {
//         parsed = parse_single_line( line );
//         if ( inside_single_line_block ) {
//           current_block += '\n' + parsed;
//         } else {
//           current_block = parsed;
//           inside_single_line_block = true;
//         }
//       }
//
//       // Parse multi-line comments
//       if ( start_multi_line_comment( line ) || inside_multi_line_block ) {
//         parsed = parse_multi_line( line );
//         if ( inside_multi_line_block ) {
//           current_block += '\n' + parsed;
//         } else {
//           current_block += parsed;
//           inside_multi_line_block = true;
//         }
//       }
//
//       // End a multi-line block
//       if ( end_multi_line_comment( line ) ) {
//         inside_multi_line_block = false;
//       }
//
//       // Store current block if done
//       if ( !single_line_comment( line ) && !inside_multi_line_block ) {
//         if ( current_block ) {
//           _blocks.push( { text: _dss.normalize( current_block ), from: from, to: lineNum } );
//         }
//         inside_single_line_block = false;
//         current_block = '';
//         last_line = '';
//       }
//
//     });
//
//     // Done first pass
//     _parsed = true;
//
//     // Create new blocks with custom parsing
//     _blocks.forEach( function ( block ) {
//
//       // Store line numbers
//       var from = block.from;
//       var to = block.to;
//
//       // Remove extra whitespace
//       block = block.text.split( '\n' ).filter( function ( line ) {
//         return ( _dss.trim( _dss.normalize( line ) ) );
//       } ).join( '\n' );
//
//       // Split block into lines
//       block.split( '\n' ).forEach( function ( line ) {
//         if ( _dss.detect( line ) ) {
//           temp = parser( temp, _dss.normalize( line ), block, lines, from, to, options );
//         }
//       });
//
//       // Push to blocks if object isn't empty
//       if( _dss.size( temp ) ) {
//         blocks.push( temp );
//       }
//       temp = {};
//
//     });
//
//     // Execute callback with filename and blocks
//     callback( { blocks: blocks } );
//
//   };
//
//   /*
//    * Parses line
//    *
//    * @param (Num) the line number
//    * @param (Num) number of lines
//    * @param (String) line to parse/check
//    * @return (Boolean) result of parsing
//    */
//   function parser ( temp, line, block, file, from, to, options ) {
//
//     var parts           = line.replace( /.*@/, '' );
//     var index           = indexer( parts, ' ' ) || indexer( parts, '\n' ) || indexer( parts, '\r' ) || parts.length;
//     var name            = _dss.trim( parts.substr( 0, index ) );
//     var output          = {
//       options: options,
//       file: file,
//       name: name,
//       line: {
//         contents: _dss.trim( parts.substr( index ) ),
//         from: block.indexOf( line ),
//         to: block.indexOf( line )
//       },
//       block: {
//         contents: block,
//         from: from,
//         to: to
//       }
//     };
//
//     // find the next instance of a parser (if there is one based on the @ symbol)
//     // in order to isolate the current multi-line parser
//     var nextParserIndex = block.indexOf( '* @', output.line.from + 1 );
//     var markupLength = ( nextParserIndex > -1 ) ? nextParserIndex - output.line.from : block.length;
//     var contents = block.split( '' ).splice( output.line.from , markupLength ).join( '' );
//     var parserMarker = '@' + name;
//     contents = contents.replace( parserMarker, '' );
//
//     // Redefine output contents to support multiline contents
//     output.line.contents = ( function( contents ) {
//       var ret = [];
//       var lines = contents.split( '\n' );
//
//       lines.forEach( function( line, i ) {
//
//         var pattern = '*';
//         var index = line.indexOf( pattern );
//
//         if ( index >= 0 && index < 10 ) {
//           line = line.split( '' ).splice( ( index + pattern.length ), line.length ).join( '' );
//         }
//
//         // Trim whitespace from the the first line in multiline contents
//         if ( i === 0 ) {
//           line = _dss.trim( line );
//         }
//
//         if ( line && line.indexOf( parserMarker ) == -1 ) {
//           ret.push( line );
//         }
//
//       });
//
//       return ret.join( '\n' );
//
//     })( contents );
//
//     line = {};
//     line[ name ] = ( _dss.parsers[ name ] ) ? _dss.parsers[ name ].call( output ) : '';
//
//     if ( temp[ name ] ) {
//       if ( !_dss.isArray( temp[ name ] ) ) {
//         temp[name] = [ temp[ name ] ];
//       }
//       if ( !_dss.isArray( line[ name ] ) ) {
//         temp[ name ].push( line[ name ] );
//       } else {
//         temp[ name ].push( line[ name ][ 0 ] );
//       }
//     } else {
//       temp = _dss.extend( temp, line );
//     }
//     return temp;
//   };
//
//
//   /*
//    * Comment block
//    */
//   function block () {
//     this._raw = ( comment_text ) ? comment_text : '';
//     this._filename = filename;
//   };
//
//   /*
//    * Check for single-line comment
//    *
//    * @param (String) line to parse/check
//    * @return (Boolean) result of check
//    */
//   function single_line_comment ( line ) {
//     return !!line.match( /^\s*\/\// );
//   };
//
//   /*
//    * Checks for start of a multi-line comment
//    *
//    * @param (String) line to parse/check
//    * @return (Boolean) result of check
//    */
//   function start_multi_line_comment ( line ) {
//     return !!line.match( /^\s*\/\*/ );
//   };
//
//   /*
//    * Check for end of a multi-line comment
//    *
//    * @parse (String) line to parse/check
//    * @return (Boolean) result of check
//    */
//   function end_multi_line_comment ( line ) {
//     if( single_line_comment( line ) ) {
//       return false;
//     }
//     return !!line.match( /.*\*\// );
//   };
//
//   /*
//    * Removes comment identifiers for single-line comments.
//    *
//    * @param (String) line to parse/check
//    * @return (Boolean) result of check
//    */
//   function parse_single_line ( line ) {
//     return line.replace( /\s*\/\//, '' );
//   };
//
//   /*
//    * Remove comment identifiers for multi-line comments.
//    *
//    * @param (String) line to parse/check
//    * @return (Boolean) result of check
//    */
//   function parse_multi_line ( line ) {
//     var cleaned = line.replace( /\s*\/\*/, '' );
//     return cleaned.replace( /\*\//, '' );
//   };
//
//   // Return function
//   return _dss;
//
// })();
//
// // Describe default detection pattern
// dss.detector( function( line ) {
//   if ( typeof line !== 'string' ) {
//     return false;
//   }
//   var reference = line.split( "\n\n" ).pop();
//   return !!reference.match( /.*@/ );
// });
//
// // Describe default parsing of a name
// dss.parser( 'name', function () {
//   return this.line.contents;
// });
//
// // Describe default parsing of a description
// dss.parser( 'description', function () {
//   return this.line.contents;
// });
//
// // Describe default parsing of a state
// dss.parser( 'state', function () {
//   var state = this.line.contents.split( ' - ' );
//   return [{
//     name: ( state[ 0 ] ) ? dss.trim( state[ 0 ] ) : '',
//     escaped: ( state[ 0 ] ) ? dss.trim( state[ 0 ].replace( '.', ' ' ).replace( ':', ' pseudo-class-' ) ) : '',
//     description: ( state[ 1 ] ) ? dss.trim( state[ 1 ] ) : ''
//   }];
// });
//
// // Describe default parsing of a piece markup
// dss.parser( 'markup', function () {
//   return [{
//     example: this.line.contents,
//     escaped: this.line.contents.replace( /</g, '&lt;' ).replace( />/g, '&gt;' )
//   }];
// });
//
// // Module exports
// if( typeof exports !== 'undefined' ) {
//   if ( typeof module !== 'undefined' && module.exports ) {
//     exports = module.exports = dss;
//   }
//   exports.dss = dss;
// } else {
//   root[ 'dss' ] = dss;
// }
//
// // AMD definition
// if ( typeof define === 'function' && define.amd ) {
//   define( function ( require ) {
//     return dss;
//   });
// }
