/*
 * Check for single-line comment
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
export default function singleLineComment(line) {
    return !!line.match(/^\s*\/\//);
}
