export default function squeeze(str, def) {
    return str.replace(/\s{2,}/g, def);
}
