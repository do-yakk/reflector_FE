const colors = ['#d4ebff', '#D5EDCC', '#FFE2E7'];
const hashtagColorMap: { [key: string]: string } = {};

let colorIndex = 0;

export function getHashtagColor(tag: string): string {
    if (hashtagColorMap[tag]) {
        return hashtagColorMap[tag];
    }
    const color = colors[colorIndex % colors.length];
    hashtagColorMap[tag] = color;
    colorIndex++;

    return color;
}