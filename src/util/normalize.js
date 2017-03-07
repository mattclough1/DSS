import trim from './trim';

/*
* Normalizes the comment block to ignore any consistent preceding
* whitespace. Consistent means the same amount of whitespace on every line
* of the comment block. Also strips any whitespace at the start and end of
* the whole block.
*
* @param (String) Text block
* @return (String) A cleaned up text block
*/

export default function normalize(textBlock) {
    // Strip out any preceding [whitespace]* that occurs on every line
    const innerBlock = textBlock.replace(/^(\s+\*+)/, '');

    // Strip consistent indenting by measuring first line's whitespace
    let indentSize;
    const unindented = lines => (
        lines.split('\n').map((line) => {
            const precedingWhitespace = line.match(/^\s*/)[0].length;
            if (!indentSize) indentSize = precedingWhitespace;
            if (line === '') {
                return '';
            } else if (indentSize <= precedingWhitespace && indentSize > 0) {
                return line.slice(indentSize, line.length);
            }
            return line;
        }).join('\n')
    );

    return trim(unindented(innerBlock));
}
