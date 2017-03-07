/*
 * Remove comment identifiers for multi-line comments.
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
export default function trimMultiLine(line) {
    return line.replace(/^(\/\*|\*\/|\*)+/g, '');
}
