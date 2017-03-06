export default function trim(str, arr) {
    const defaults = [/^\s\s*/, /\s\s*$/];
    const newArr = Array.isArray(arr) ? arr.concat(defaults) : defaults;
    let trimmedStr;
    newArr.forEach((regEx) => {
        trimmedStr = str.replace(regEx, '');
    });
    return trimmedStr;
}
