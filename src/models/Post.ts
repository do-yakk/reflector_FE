export type Site = 'BAEKJOON' | 'PROGRAMMERS' | 'LEETCODE';
export type Level =
  | "BAEKJOON_BRONZE"
  | "BAEKJOON_SILVER"
  | "BAEKJOON_GOLD"
  | "BAEKJOON_PLATINUM"
  | "BAEKJOON_DIAMOND"
  | "BAEKJOON_RUBY"
  | "BAEKJOON_UNRATED"
  | "PROGRAMMERS_LV0"
  | "PROGRAMMERS_LV1"
  | "PROGRAMMERS_LV2"
  | "PROGRAMMERS_LV3"
  | "PROGRAMMERS_LV4"
  | "PROGRAMMERS_LV5"
  | "LEETCODE_EASY"
  | "LEETCODE_MEDIUM"
  | "LEETCODE_HARD";

export interface CreatePostRequest {
  site: Site;
  level: Level;
  title: string;
  content: string;
  input: string;
  output: string;
  limit_time: string;
  limit_mem: string;
}