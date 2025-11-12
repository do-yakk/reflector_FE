import type { TextCommand, CodeCommand } from "../models/Block";
import type { PostCommand } from "../models/Post";

// post 생성
export async function createPost(post: PostCommand) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Post 생성 실패");
  return res.json();
}

// 텍스트 블럭 생성
export async function createTextBlock(postId: number, block: TextCommand) {
  const res = await fetch(`/api/blocks/${postId}/text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });
  if (!res.ok) throw new Error("Text 블럭 생성 실패");
  return res.json();
}

// 코드 블럭 생성
export async function createCodeBlock(postId: number, block: CodeCommand) {
  const res = await fetch(`/api/blocks/${postId}/code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(block),
  });
  if (!res.ok) throw new Error("Code 블럭 생성 실패");
  return res.json();
}