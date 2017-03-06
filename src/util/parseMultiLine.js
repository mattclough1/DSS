/*
 * Remove comment identifiers for multi-line comments.
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
export default function parseMultiLine(line) {
    const cleaned = line.replace(/\s*\/\*/, '').replace(/\*\//, '');
    return cleaned;
}
