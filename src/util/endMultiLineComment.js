import singleLineComment from './singleLineComment';

/*
 * Check for end of a multi-line comment
 *
 * @parse (String) line to parse/check
 * @return (Boolean) result of check
 */
export default function endMultiLineComment(line) {
    if (singleLineComment(line)) {
        return false;
    }
    return !!line.match(/.*\*\//);
}
