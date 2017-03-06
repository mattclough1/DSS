/*
 * Get the index of string inside of another
 */
export default function getStrIndex(str, find) {
    return (str.indexOf(find) > 0) ? str.indexOf(find) : false;
}
