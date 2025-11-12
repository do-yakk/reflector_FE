const colors: { [key: string]: string } = {
  "골드": "#FFF1CD",   
  "실버": "#DBDBDB", 
  "브론즈": "#E3CEBD",
  "Gold": "#FFF1CD",   
  "Silver": "#DBDBDB", 
  "Bronze": "#E3CEBD",
};

export function getLevelColor(tag: string): string {
  const group = Object.keys(colors).find(g => tag.startsWith(g));
  
  if (group) {
    return colors[group];
  }

  return "#808080"; // 기본 회색
}