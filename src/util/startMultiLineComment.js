/*
 * Checks for start of a multi-line comment
 *
 * @param (String) line to parse/check
 * @return (Boolean) result of check
 */
export default function startMultiLineComment(line) {
    return !!line.match(/^\s*\/\*/);
}
