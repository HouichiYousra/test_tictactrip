export function justifyText(text: string): string {
    const maxLineLength = 80;
    const words = text.split(/\s+/);
    let lines: string[] = [];
    let currentLine: string[] = [];

    words.forEach(word => {
        const lineLength = currentLine.join(' ').length;
        if (lineLength + word.length + 1 <= maxLineLength) {
            currentLine.push(word);
        } else {
            lines.push(currentLine.join(' '));
            currentLine = [word];
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine.join(' '));
    }

    return lines.join('\n');
}
