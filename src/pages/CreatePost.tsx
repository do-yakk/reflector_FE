import React, { useState } from "react";
import { Button } from "../components/post/Button.tsx";
import { Block } from "../components/post/Block.tsx";
import Post from "../components/post/Post.tsx";
import styles from "./CreatePost.module.css";
import { createPost, createTextBlock, createCodeBlock } from "../api/postApis.ts";
import type { PostCommand } from "../models/Post.ts";
import type { TextCommand, CodeCommand } from "../models/Block.ts";

type BlockVariant = "code" | "text";

interface PostBlock {
  id: number;
  variant: BlockVariant;
  textForm?: TextCommand;
  codeForm?: CodeCommand;
}

const CreatePostPage: React.FC = () => {
  // 포스트 상태
  const [postForm, setPostForm] = useState<PostCommand>({
    title: "",
    site: "BAEKJOON",
    level: "BAEKJOON_GOLD",
    content: "",
    input: "",
    output: "",
    limit_time: "",
    limit_mem: "",
  });

  // 블럭 상태
  const [blocks, setBlocks] = useState<PostBlock[]>([]);
  const [blockId, setBlockId] = useState(0);

  const addBlock = (variant: BlockVariant) => {
    const newBlock: PostBlock = {
      id: blockId,
      variant,
      textForm: variant === "text" ? { content: "" } : undefined,
      codeForm:
        variant === "code"
          ? { content: "", language: "C", perform_time: "0", perform_mem: "0", hashtags: [] }
          : undefined,
    };
    setBlocks([...blocks, newBlock]);
    setBlockId(blockId + 1);
  };

  const updateTextBlock = (id: number, next: TextCommand) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, textForm: next } : b))
    );
  };

  const updateCodeBlock = (id: number, next: CodeCommand) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, codeForm: next } : b))
    );
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleSave = async () => {
    try {
      const postResp = await createPost(postForm);
      const postId = postResp.id;
      if (!postId) throw new Error("Post ID 없음");

      for (const blk of blocks) {
        if (blk.variant === "text" && blk.textForm) {
          await createTextBlock(postId, blk.textForm);
        } else if (blk.variant === "code" && blk.codeForm) {
          const c: CodeCommand = {
            content: blk.codeForm.content,
            language: blk.codeForm.language,
            perform_time: blk.codeForm.perform_time,
            perform_mem: blk.codeForm.perform_mem,
            hashtags: blk.codeForm.hashtags,
          };
          await createCodeBlock(postId, c);
        }
      }

      alert("저장 완료!");
    } catch (err) {
      console.error(err);
      alert("저장 실패");
    }
  };

  return (
    <div className={styles.container}>
      <Button variant="back" onClick={handleBackClick}>
        ←
      </Button>

      <div className={styles.container}>
        {/* 포스트 기본 정보 */}
        <Post form={postForm} onChange={setPostForm} />

        {/* 블럭들 */}
        <div className={styles.blocks}>
          {blocks.map((block) => (
            <Block
              key={block.id}
              variant={block.variant}
              textForm={block.textForm}
              codeForm={block.codeForm}
              onTextChange={(next) => updateTextBlock(block.id, next)}
              onCodeChange={(next) => updateCodeBlock(block.id, next)}
            />
          ))}
        </div>

        {/* 블럭 추가 버튼 */}
        <div className={styles.button}>
          <Button variant="add" onClick={() => addBlock("code")}>+ 코드 스니펫 추가</Button>
          <Button variant="add" onClick={() => addBlock("text")}>+ 해설 추가</Button>
        </div>

        {/* 저장 버튼 */}
        <Button variant="save" onClick={handleSave}>완료</Button>
      </div>
    </div>
  );
};

export default CreatePostPage;