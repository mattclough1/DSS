import {
    singleLineComment,
    startMultiLineComment,
    endMultiLineComment,
    trimSingleLine,
    trimMultiLine,
    trimWhitespace,
    size,
    normalize,
    getStrIndex
} from './util';

export default class DSS {
    constructor() {
        this.parsers = {};
        this.parse = this.parse.bind(this);
        this.detector = this.detector.bind(this);
        this.alias = this.alias.bind(this);
        this.detect = () => true;
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
        const name = trimWhitespace(parts.substr(0, index));
        const output = {
            options,
            file,
            name,
            line: {
                contents: trimWhitespace(parts.substr(index)),
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
        const nextParserIndex = block.indexOf('@', output.line.from + 1);
        const markupLength = (nextParserIndex > -1) ? nextParserIndex - output.line.from : block.length;
        const parserMarker = `@${name}`;
        const contents = block.split('').splice(output.line.from, markupLength).join('').replace(parserMarker, '');

        // Redefine output contents to support multiline contents
        output.line.contents = trimWhitespace(contents);

        const newLine = {};
        newLine[name] = (this.parsers[name]) ? this.parsers[name].call(output, output) : '';

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

    parse(lines, options = {}, callback) {
        // Setup
        let currentBlock = '';
        let insideSingleLineBlock = false;
        let insideMultiLineBlock = false;
        const unparsedBlocks = [];
        let trimmed = '';
        const parsedBlocks = [];
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
                trimmed = trimSingleLine(line);
                if (insideSingleLineBlock) {
                    currentBlock += `\n${trimmed}`;
                } else {
                    currentBlock = trimmed;
                    insideSingleLineBlock = true;
                }
            }

            // Parse multi-line comments
            if (startMultiLineComment(line) || insideMultiLineBlock) {
                trimmed = trimMultiLine(line);
                if (insideMultiLineBlock) {
                    currentBlock += `\n${trimmed}`;
                } else {
                    currentBlock += trimmed;
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
                    unparsedBlocks.push({ text: normalize(currentBlock), from, to: lineNum });
                }
                insideSingleLineBlock = false;
                currentBlock = '';
            }
        });

        // Create new blocks with custom parsing
        unparsedBlocks.forEach((_block) => {
            // Store line numbers
            from = _block.from;
            to = _block.to;

            // Remove extra whitespace
            const block = _block.text.split('\n').filter(line => (
                trimWhitespace(normalize(line))
            )).join('\n');

            // Split block into lines
            block.split('\n').forEach((line) => {
                if (this.detect(line)) {
                    temp = this.parseLine(temp, line, block, lines, from, to, options);
                }
            });

            // Push to blocks if object isn't empty
            if (size(temp)) {
                parsedBlocks.push(temp);
            }
            temp = {};
        });

        // Execute callback with filename and blocks
        callback({ blocks: parsedBlocks });
    }
}
