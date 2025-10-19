const colors = ['#d4ebff', '#D5EDCC', '#FFE2E7']; // 돌려쓸 색상
const hashtagColorMap: { [key: string]: string } = {}; // 해시태그 -> 색상 매핑

let colorIndex = 0;

export function getHashtagColor(tag: string): string {
    if (hashtagColorMap[tag]) {
        return hashtagColorMap[tag]; // 이미 색상이 지정되어 있으면 그대로 반환
    }
    const color = colors[colorIndex % colors.length]; // 색상 순환
    hashtagColorMap[tag] = color; // 새 색상 매핑
    colorIndex++;

    return color;
}