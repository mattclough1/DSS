import trimWhitespace from './trimWhitespace';

export default function cleanLine(contents, parserMarker) {
    const ret = [];
    const lines = contents.split('\n');

    lines.forEach((line, i) => {
        console.log(line);
        const pattern = '*';
        const index = line.indexOf(pattern);
        let cleanedLine = line;

        if (index >= 0 && index < 10) {
            cleanedLine = cleanedLine.split('').splice((index + pattern.length), cleanedLine.length).join('');
        }

        // Trim whitespace from the the first line in multiline contents
        if (i === 0) {
            cleanedLine = trimWhitespace(cleanedLine);
        }

        if (cleanedLine && cleanedLine.indexOf(parserMarker) === -1) {
            ret.push(cleanedLine);
        }
        console.log(cleanedLine);
    });
    return ret.join('\n');
}
