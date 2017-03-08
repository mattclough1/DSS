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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _endMultiLineComment = __webpack_require__(3);

var _endMultiLineComment2 = _interopRequireDefault(_endMultiLineComment);

var _trimMultiLine = __webpack_require__(9);

var _trimMultiLine2 = _interopRequireDefault(_trimMultiLine);

var _trimSingleLine = __webpack_require__(10);

var _trimSingleLine2 = _interopRequireDefault(_trimSingleLine);

var _singleLineComment = __webpack_require__(1);

var _singleLineComment2 = _interopRequireDefault(_singleLineComment);

var _startMultiLineComment = __webpack_require__(8);

var _startMultiLineComment2 = _interopRequireDefault(_startMultiLineComment);

var _trimWhitespace = __webpack_require__(11);

var _trimWhitespace2 = _interopRequireDefault(_trimWhitespace);

var _size = __webpack_require__(6);

var _size2 = _interopRequireDefault(_size);

var _squeeze = __webpack_require__(7);

var _squeeze2 = _interopRequireDefault(_squeeze);

var _normalize = __webpack_require__(5);

var _normalize2 = _interopRequireDefault(_normalize);

var _getStrIndex = __webpack_require__(4);

var _getStrIndex2 = _interopRequireDefault(_getStrIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    endMultiLineComment: _endMultiLineComment2.default,
    trimMultiLine: _trimMultiLine2.default,
    trimSingleLine: _trimSingleLine2.default,
    singleLineComment: _singleLineComment2.default,
    startMultiLineComment: _startMultiLineComment2.default,
    trimWhitespace: _trimWhitespace2.default,
    size: _size2.default,
    squeeze: _squeeze2.default,
    normalize: _normalize2.default,
    getStrIndex: _getStrIndex2.default
};
module.exports = exports['default'];

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DSS = function () {
    function DSS() {
        _classCallCheck(this, DSS);

        this.parsers = {};
        this.parse = this.parse.bind(this);
        this.detector = this.detector.bind(this);
        this.alias = this.alias.bind(this);
        this.detect = function () {
            return true;
        };
    }

    _createClass(DSS, [{
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
            var name = (0, _util.trimWhitespace)(parts.substr(0, index));
            var output = {
                options: options,
                file: file,
                name: name,
                line: {
                    contents: (0, _util.trimWhitespace)(parts.substr(index)),
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
            var nextParserIndex = block.indexOf('@', output.line.from + 1);
            var markupLength = nextParserIndex > -1 ? nextParserIndex - output.line.from : block.length;
            var parserMarker = '@' + name;
            var contents = block.split('').splice(output.line.from, markupLength).join('').replace(parserMarker, '');

            // Redefine output contents to support multiline contents
            output.line.contents = (0, _util.trimWhitespace)(contents);

            var newLine = {};
            newLine[name] = this.parsers[name] ? this.parsers[name].call(output, output) : '';

            if (temp[name]) {
                if (!Array.isArray(temp[name])) {
                    temp[name] = [temp[name]];
                }
                if (!Array.isArray(newLine[name])) {
                    temp[name].push(newLine[name]);
                } else {
                    temp[name].push(newLine[name][0]);
                }
            } else {
                temp = Object.assign({}, temp, newLine);
            }
            return temp;
        }
    }, {
        key: 'parse',
        value: function parse(lines) {
            var _this = this;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var callback = arguments[2];

            // Setup
            var currentBlock = '';
            var insideSingleLineBlock = false;
            var insideMultiLineBlock = false;
            var unparsedBlocks = [];
            var trimmed = '';
            var parsedBlocks = [];
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
                    trimmed = (0, _util.trimSingleLine)(line);
                    if (insideSingleLineBlock) {
                        currentBlock += '\n' + trimmed;
                    } else {
                        currentBlock = trimmed;
                        insideSingleLineBlock = true;
                    }
                }

                // Parse multi-line comments
                if ((0, _util.startMultiLineComment)(line) || insideMultiLineBlock) {
                    trimmed = (0, _util.trimMultiLine)(line);
                    if (insideMultiLineBlock) {
                        currentBlock += '\n' + trimmed;
                    } else {
                        currentBlock += trimmed;
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
                        unparsedBlocks.push({ text: (0, _util.normalize)(currentBlock), from: from, to: lineNum });
                    }
                    insideSingleLineBlock = false;
                    currentBlock = '';
                }
            });

            // Create new blocks with custom parsing
            unparsedBlocks.forEach(function (_block) {
                // Store line numbers
                from = _block.from;
                to = _block.to;

                // Remove extra whitespace
                var block = _block.text.split('\n').filter(function (line) {
                    return (0, _util.trimWhitespace)((0, _util.normalize)(line));
                }).join('\n');

                // Split block into lines
                block.split('\n').forEach(function (line) {
                    if (_this.detect(line)) {
                        temp = _this.parseLine(temp, line, block, lines, from, to, options);
                    }
                });

                // Push to blocks if object isn't empty
                if ((0, _util.size)(temp)) {
                    parsedBlocks.push(temp);
                }
                temp = {};
            });

            // Execute callback with filename and blocks
            callback({ blocks: parsedBlocks });
        }
    }]);

    return DSS;
}();

exports.default = DSS;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endMultiLineComment;

var _singleLineComment = __webpack_require__(1);

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalize;
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
    // Strip consistent indenting by measuring first line's whitespace
    var indentSize = void 0;
    var normalized = textBlock.split('\n').map(function (line) {
        var precedingWhitespace = line.match(/^\s*/)[0].length;
        if (!indentSize) indentSize = precedingWhitespace;
        if (line === '') {
            return '';
        } else if (indentSize <= precedingWhitespace && indentSize > 0) {
            return line.slice(indentSize, line.length);
        }
        return line;
    }).join('\n');

    return normalized;
}
module.exports = exports['default'];

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trimMultiLine;
/*
 * Remove comment identifiers for multi-line comments.
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
function trimMultiLine(line) {
  return line.replace(/^(\/\*|\*\/|\*)+/g, '');
}
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trimSingleLine;
/*
 * Removes comment identifiers for single-line comments.
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
function trimSingleLine(line) {
  return line.replace(/\s*\/\//, '');
}
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = trimWhitespace;
/*
* Trim whitespace from string
*
* @param (String) The string to be trimmed
* @return (String) The trimmed string
*/

function trimWhitespace(str, arr) {
    var defaults = [/^\s\s*/, /\s\s*$/];
    var newArr = Array.isArray(arr) ? arr.concat(defaults) : defaults;
    var trimmedStr = str;
    newArr.forEach(function (regEx) {
        trimmedStr = trimmedStr.replace(regEx, '');
    });
    return trimmedStr;
}
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dss = __webpack_require__(2);

var _dss2 = _interopRequireDefault(_dss);

var _util = __webpack_require__(0);

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
        name: state[0] ? (0, _util.trimWhitespace)(state[0]) : '',
        escaped: state[0] ? (0, _util.trimWhitespace)(state[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
        description: state[1] ? (0, _util.trimWhitespace)(state[1]) : ''
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