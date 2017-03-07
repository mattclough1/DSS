/*
* Trim whitespace from string
*
* @param (String) The string to be trimmed
* @return (String) The trimmed string
*/

export default function trimWhitespace(str, arr) {
    const defaults = [/^\s\s*/, /\s\s*$/];
    const newArr = Array.isArray(arr) ? arr.concat(defaults) : defaults;
    let trimmedStr = str;
    newArr.forEach((regEx) => {
        trimmedStr = trimmedStr.replace(regEx, '');
    });
    return trimmedStr;
}
