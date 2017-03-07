/*
 * Removes comment identifiers for single-line comments.
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
export default function trimSingleLine(line) {
    return line.replace(/\s*\/\//, '');
}
