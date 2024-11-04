export function justifyText(text: string): string {
    const maxLineLength = 80;
    const words = text.split(/\s+/);
    let lines: string[] = [];
    let currentLine: string[] = [];

    words.forEach(word => {
        const lineLength = currentLine.join(' ').length;
        if (lineLength + word.length + (currentLine.length > 0 ? 1 : 0) <= maxLineLength) {
            currentLine.push(word);
        } else {
            lines.push(justifyLine(currentLine, maxLineLength));
            currentLine = [word];
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine.join(' '));
    }

    return lines.join('\n');
}

function justifyLine(line: string[], maxLineLength: number): string {
    const totalSpaces = maxLineLength - line.join('').length;
    const gaps = line.length - 1;

    if (gaps === 0) {
        return line[0];
    }

    const spacePerGap = Math.floor(totalSpaces / gaps); 
    const extraSpaces = totalSpaces % gaps; 

    return line.reduce((justified, word, index) => {
        justified += word;
        if (index < gaps) {
            justified += ' '.repeat(spacePerGap + (index < extraSpaces ? 1 : 0));
        }
        return justified;
    }, '');
}
