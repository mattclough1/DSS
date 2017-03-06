import trim from './trim';

export default function cleanLine(contents, parserMarker) {
    const ret = [];
    const lines = contents.split('\n');

    lines.forEach((line, i) => {
        const pattern = '*';
        const index = line.indexOf(pattern);
        let cleanedLine = line;

        if (index >= 0 && index < 10) {
            cleanedLine = cleanedLine.split('').splice((index + pattern.length), cleanedLine.length).join('');
        }

        // Trim whitespace from the the first line in multiline contents
        if (i === 0) {
            cleanedLine = trim(cleanedLine);
        }

        if (cleanedLine && cleanedLine.indexOf(parserMarker) === -1) {
            ret.push(cleanedLine);
        }
    });

    return ret.join('\n');
}
