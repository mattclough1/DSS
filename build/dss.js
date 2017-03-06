module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = trim;
function trim(str, arr) {
    var defaults = [/^\s\s*/, /\s\s*$/];
    var newArr = Array.isArray(arr) ? arr.concat(defaults) : defaults;
    var trimmedStr = void 0;
    newArr.forEach(function (regEx) {
        trimmedStr = str.replace(regEx, '');
    });
    return trimmedStr;
}
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _endMultiLineComment = __webpack_require__(5);

var _endMultiLineComment2 = _interopRequireDefault(_endMultiLineComment);

var _parseMultiLine = __webpack_require__(8);

var _parseMultiLine2 = _interopRequireDefault(_parseMultiLine);

var _parseSingleLine = __webpack_require__(9);

var _parseSingleLine2 = _interopRequireDefault(_parseSingleLine);

var _singleLineComment = __webpack_require__(2);

var _singleLineComment2 = _interopRequireDefault(_singleLineComment);

var _startMultiLineComment = __webpack_require__(12);

var _startMultiLineComment2 = _interopRequireDefault(_startMultiLineComment);

var _trim = __webpack_require__(0);

var _trim2 = _interopRequireDefault(_trim);

var _size = __webpack_require__(10);

var _size2 = _interopRequireDefault(_size);

var _squeeze = __webpack_require__(11);

var _squeeze2 = _interopRequireDefault(_squeeze);

var _normalize = __webpack_require__(7);

var _normalize2 = _interopRequireDefault(_normalize);

var _getStrIndex = __webpack_require__(6);

var _getStrIndex2 = _interopRequireDefault(_getStrIndex);

var _cleanLine = __webpack_require__(4);

var _cleanLine2 = _interopRequireDefault(_cleanLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    endMultiLineComment: _endMultiLineComment2.default,
    parseMultiLine: _parseMultiLine2.default,
    parseSingleLine: _parseSingleLine2.default,
    singleLineComment: _singleLineComment2.default,
    startMultiLineComment: _startMultiLineComment2.default,
    trim: _trim2.default,
    size: _size2.default,
    squeeze: _squeeze2.default,
    normalize: _normalize2.default,
    getStrIndex: _getStrIndex2.default,
    cleanLine: _cleanLine2.default
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = singleLineComment;
/*
 * Check for single-line comment
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
function singleLineComment(line) {
  return !!line.match(/^\s*\/\//);
}
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DSS = function () {
    function DSS() {
        _classCallCheck(this, DSS);

        this.parsers = {};
        this.parse = this.parse.bind(this);
        this.detector = this.detector.bind(this);
        this.alias = this.alias.bind(this);
    }

    _createClass(DSS, [{
        key: 'detect',
        value: function detect() {
            return true;
        }
    }, {
        key: 'detector',
        value: function detector(callback) {
            this.detect = callback;
        }
    }, {
        key: 'parser',
        value: function parser(name, callback) {
            this.parsers[name] = callback;
        }
    }, {
        key: 'alias',
        value: function alias(newName, oldName) {
            this.parsers[newName] = this.parsers[oldName];
        }
    }, {
        key: 'parseLine',
        value: function parseLine(_temp, line, block, file, from, to, options) {
            var temp = _temp;
            var parts = line.replace(/.*@/, '');
            var index = (0, _util.getStrIndex)(parts, ' ') || (0, _util.getStrIndex)(parts, '\n') || (0, _util.getStrIndex)(parts, '\r') || parts.length;
            var name = (0, _util.trim)(parts.substr(0, index));
            var output = {
                options: options,
                file: file,
                name: name,
                line: {
                    contents: (0, _util.trim)(parts.substr(index)),
                    from: block.indexOf(line),
                    to: block.indexOf(line)
                },
                block: {
                    contents: block,
                    from: from,
                    to: to
                }
            };

            // find the next instance of a parser (if there is one based on the @ symbol)
            // in order to isolate the current multi-line parser
            var nextParserIndex = block.indexOf('* @', output.line.from + 1);
            var markupLength = nextParserIndex > -1 ? nextParserIndex - output.line.from : block.length;
            var parserMarker = '@' + name;
            var contents = block.split('').splice(output.line.from, markupLength).join('').replace(parserMarker, '');

            // Redefine output contents to support multiline contents
            output.line.contents = (0, _util.cleanLine)(contents, parserMarker);

            var newLine = {};
            newLine[name] = this.parsers[name] ? this.parsers[name].call(output, output) : '';

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
    }, {
        key: 'parse',
        value: function parse(lines) {
            var _this = this;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var callback = arguments[2];

            // Options
            // options.preserveWhitespace = !!(options.preserveWhitespace);

            // Setup
            var currentBlock = '';
            var insideSingleLineBlock = false;
            var insideMultiLineBlock = false;
            var lastLine = void 0;
            // const start = '{start}';
            // const end = '{/end}';
            var _parsed = false;
            var _blocks = [];
            var parsed = '';
            var blocks = [];
            var temp = {};
            var lineNum = 0;
            var from = 0;
            var to = 0;

            lines.toString().split(/\n/).forEach(function (line) {
                // Increment line number and ensure line is treated as a string
                lineNum++;

                // Store starting line number
                if ((0, _util.singleLineComment)(line) || (0, _util.startMultiLineComment)(line)) {
                    from = lineNum;
                }

                // Parse Single line comment
                if ((0, _util.singleLineComment)(line)) {
                    parsed = (0, _util.parseSingleLine)(line);
                    if (insideSingleLineBlock) {
                        currentBlock += '\n' + parsed;
                    } else {
                        currentBlock = parsed;
                        insideSingleLineBlock = true;
                    }
                }

                // Parse multi-line comments
                if ((0, _util.startMultiLineComment)(line) || insideMultiLineBlock) {
                    parsed = (0, _util.parseMultiLine)(line);
                    if (insideMultiLineBlock) {
                        currentBlock += '\n' + parsed;
                    } else {
                        currentBlock += parsed;
                        insideMultiLineBlock = true;
                    }
                }

                // End a multi-line block
                if ((0, _util.endMultiLineComment)(line)) {
                    insideMultiLineBlock = false;
                }

                // Store current block if done
                if (!(0, _util.singleLineComment)(line) && !insideMultiLineBlock) {
                    if (currentBlock) {
                        _blocks.push({ text: (0, _util.normalize)(currentBlock), from: from, to: lineNum });
                    }
                    insideSingleLineBlock = false;
                    currentBlock = '';
                    lastLine = '';
                }
            });

            // Done first pass
            _parsed = true;

            // Create new blocks with custom parsing
            _blocks.forEach(function (_block) {
                // Store line numbers
                from = _block.from;
                to = _block.to;

                // Remove extra whitespace
                var block = _block.text.split('\n').filter(function (line) {
                    return (0, _util.trim)((0, _util.normalize)(line));
                }).join('\n');
                // const block = _block.text.split('\n').filter(line => (
                //     trim(normalize(line))
                // )).join('\n');

                // Split block into lines
                block.split('\n').forEach(function (line) {
                    if (_this.detect(line)) {
                        temp = _this.parseLine(temp, (0, _util.normalize)(line), block, lines, from, to, options);
                    }
                });

                // Push to blocks if object isn't empty
                if ((0, _util.size)(temp)) {
                    blocks.push(temp);
                }
                temp = {};
            });

            // Execute callback with filename and blocks
            callback({ blocks: blocks });
        }
    }]);

    return DSS;
}();

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


exports.default = DSS;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cleanLine;

var _trim = __webpack_require__(0);

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanLine(contents, parserMarker) {
    var ret = [];
    var lines = contents.split('\n');

    lines.forEach(function (line, i) {
        var pattern = '*';
        var index = line.indexOf(pattern);
        var cleanedLine = line;

        if (index >= 0 && index < 10) {
            cleanedLine = cleanedLine.split('').splice(index + pattern.length, cleanedLine.length).join('');
        }

        // Trim whitespace from the the first line in multiline contents
        if (i === 0) {
            cleanedLine = (0, _trim2.default)(cleanedLine);
        }

        if (cleanedLine && cleanedLine.indexOf(parserMarker) === -1) {
            ret.push(cleanedLine);
        }
    });

    return ret.join('\n');
}
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endMultiLineComment;

var _singleLineComment = __webpack_require__(2);

var _singleLineComment2 = _interopRequireDefault(_singleLineComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Check for end of a multi-line comment
 *
 * @parse (String) line to parse/check
 * @return (Boolean) result of check
 */
function endMultiLineComment(line) {
    if ((0, _singleLineComment2.default)(line)) {
        return false;
    }
    return !!line.match(/.*\*\//);
}
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStrIndex;
/*
 * Get the index of string inside of another
 */
function getStrIndex(str, find) {
  return str.indexOf(find) > 0 ? str.indexOf(find) : false;
}
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalize;

var _trim = __webpack_require__(0);

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Normalizes the comment block to ignore any consistent preceding
* whitespace. Consistent means the same amount of whitespace on every line
* of the comment block. Also strips any whitespace at the start and end of
* the whole block.
*
* @param (String) Text block
* @return (String) A cleaned up text block
*/

function normalize(textBlock) {
    // Strip out any preceding [whitespace]* that occurs on every line
    var normalized = textBlock.replace(/^(\s+\*+)/, '');

    // Strip consistent indenting by measuring first line's whitespace
    var indentSize = void 0;
    var unindented = function unindented(lines) {
        return lines.split('\n').map(function (line) {
            var precedingWhitespace = line.match(/^\s*/)[0].length;
            if (!indentSize) indentSize = precedingWhitespace;
            if (line === '') {
                return '';
            } else if (indentSize <= precedingWhitespace && indentSize > 0) {
                console.log(line.slice(indentSize, line.length - 1));
                return line.slice(indentSize, line.length - 1);
            }
            return line;
        }).join('\n');
    };

    normalized = unindented(normalized);

    return (0, _trim2.default)(normalized);
}
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseMultiLine;
/*
 * Remove comment identifiers for multi-line comments.
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
function parseMultiLine(line) {
  var cleaned = line.replace(/\s*\/\*/, '').replace(/\*\//, '');
  return cleaned;
}
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSingleLine;
/*
 * Removes comment identifiers for single-line comments.
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
function parseSingleLine(line) {
  return line.replace(/\s*\/\//, '');
}
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = size;
function size(obj) {
    return Object.keys(obj).length;
}
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = squeeze;
function squeeze(str, def) {
    return str.replace(/\s{2,}/g, def);
}
module.exports = exports["default"];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startMultiLineComment;
/*
 * Checks for start of a multi-line comment
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
function startMultiLineComment(line) {
  return !!line.match(/^\s*\/\*/);
}
module.exports = exports["default"];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dss = __webpack_require__(3);

var _dss2 = _interopRequireDefault(_dss);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dss = new _dss2.default();

// Describe default detection pattern
dss.detector(function (line) {
    if (typeof line !== 'string') {
        return false;
    }
    var reference = line.split('\n\n').pop();
    return !!reference.match(/.*@/);
});

// Describe default parsing of a name
dss.parser('name', function (_ref) {
    var line = _ref.line;
    return line.contents;
});

// Describe default parsing of a description
dss.parser('description', function (_ref2) {
    var line = _ref2.line;
    return line.contents;
});

// Describe default parsing of a state
dss.parser('state', function (_ref3) {
    var line = _ref3.line;

    var state = line.contents.split(' - ');
    return [{
        name: state[0] ? (0, _util.trim)(state[0]) : '',
        escaped: state[0] ? (0, _util.trim)(state[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
        description: state[1] ? (0, _util.trim)(state[1]) : ''
    }];
});

// Describe default parsing of a piece markup
dss.parser('markup', function (_ref4) {
    var line = _ref4.line;
    return [{
        example: line.contents,
        escaped: line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }];
});

exports.default = dss;
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=dss.js.map