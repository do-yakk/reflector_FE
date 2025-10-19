import type { Level, Site } from '../models/Post';

export const LEVEL_DISPLAY: Record<Level, string> = {
    // 백준
    BAEKJOON_BRONZE: 'Bronze',
    BAEKJOON_SILVER: 'Silver',
    BAEKJOON_GOLD: 'Gold',
    BAEKJOON_PLATINUM: 'Platinum',
    BAEKJOON_DIAMOND: 'Diamond',
    BAEKJOON_RUBY: 'Ruby',
    BAEKJOON_UNRATED: 'Unrated',
    
    // 프로그래머스     
    PROGRAMMERS_LV0: 'Lv.0',
    PROGRAMMERS_LV1: 'Lv.1',
    PROGRAMMERS_LV2: 'Lv.2',
    PROGRAMMERS_LV3: 'Lv.3',
    PROGRAMMERS_LV4: 'Lv.4',
    PROGRAMMERS_LV5: 'Lv.5',

    // 리트코드
    LEETCODE_EASY: 'Easy',
    LEETCODE_MEDIUM: 'Medium',
    LEETCODE_HARD: 'Hard',
};

export const LEVEL_BY_SITE: Record<Site, Level[]> = {
  BAEKJOON: [
    "BAEKJOON_BRONZE",
    "BAEKJOON_SILVER",
    "BAEKJOON_GOLD",
    "BAEKJOON_PLATINUM",
    "BAEKJOON_DIAMOND",
    "BAEKJOON_RUBY",
    "BAEKJOON_UNRATED",
  ],
  PROGRAMMERS: [
    "PROGRAMMERS_LV0",
    "PROGRAMMERS_LV1",
    "PROGRAMMERS_LV2",
    "PROGRAMMERS_LV3",
    "PROGRAMMERS_LV4",
    "PROGRAMMERS_LV5",
  ],
  LEETCODE: ["LEETCODE_EASY", "LEETCODE_MEDIUM", "LEETCODE_HARD"],
};