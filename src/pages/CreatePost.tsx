import React, { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom"; 
import { Button } from "../components/post/Button.tsx"; 
import { Block } from "../components/post/Block.tsx"; 
import Post from "../components/post/Post.tsx"; 
import styles from "./CreatePost.module.css"; 
import { createPost, createTextBlock, createCodeBlock, getPost, updatePost, deleteBlock,
  updateTextBlock as updateTextBlockApi, updateCodeBlock as updateCodeBlockApi  } from "../apis/postApi.ts"; 
import type { PostCommand, Level } from "../models/Post.ts"; 
import type { TextCommand, CodeCommand } from "../models/Block.ts"; 
import type { Block as BlockModel } from "../models/Block.ts"; 
import { LEVEL_DISPLAY } from "../utils/level.ts";

type BlockVariant = "code" | "text";

interface PostBlock {
  id: number;
  variant: BlockVariant;
  textForm?: TextCommand;
  codeForm?: CodeCommand;
  blockId?: number;
}

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const isEditMode = !!id;
  
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
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => { 
    if (isEditMode && id) { 
      const loadPost = async () => { 
        try { const post = await getPost(Number(id)); 
          const levelRaw = post.level ?? "BAEKJOON_GOLD"; 
          const matchedLevelEntry = (Object.entries(LEVEL_DISPLAY) as [Level, string][]).find( ([, label]) => label === levelRaw ); 
          const levelFallback = (Object.keys(LEVEL_DISPLAY) as Level[]).includes(levelRaw as Level) ? (levelRaw as Level) : "BAEKJOON_GOLD"; 
          const levelValue = matchedLevelEntry ? matchedLevelEntry[0] : levelFallback; 
          setPostForm({ title: post.title || "", 
            site: post.site || "BAEKJOON", 
            level: levelValue, 
            content: post.content || "", 
            input: post.input || "", 
            output: post.output || "", 
            limit_time: post.limitTime || "", 
            limit_mem: post.limitMem || "", 
        });
        
        const loadedBlocks: PostBlock[] = 
          (post.blocks || []).map((block: BlockModel, index: number) => { 
            if (block.type === "TEXT") { 
              return { id: index, blockId: block.blockId, variant: "text", 
                textForm: { content: block.content }, }; 
            } else { 
              return { id: index, blockId: block.blockId, variant: "code", 
                codeForm: { content: block.content, language: block.language, 
                  perform_time: block.perform_time || "", perform_mem: block.perform_mem || "", hashtags: block.hashtags || [], }, }; 
              } 
          });
          
        setBlocks(loadedBlocks); 
        setBlockId(loadedBlocks.length); 
      } catch (err) { 
        console.error(err); alert("포스트 로드 실패"); 
        navigate(-1); 
      } finally { 
        setLoading(false); 
      } 
    }; 
    loadPost(); } 
  }, [isEditMode, id, navigate]);

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
      let postId: number;
      
      if (isEditMode && id) {
        await updatePost(Number(id), postForm);
        postId = Number(id);

        for (const blk of blocks) {
          const hasPersistedId = blk.blockId !== undefined && blk.blockId !== null;
          if (hasPersistedId) {
            if (blk.variant === "text" && blk.textForm) {
              await updateTextBlockApi(postId, blk.blockId!, blk.textForm);
            } else if (blk.variant === "code" && blk.codeForm) {
              await updateCodeBlockApi(postId, blk.blockId!, blk.codeForm);
            }
          } else {
            if (blk.variant === "text" && blk.textForm) {
              const created = await createTextBlock(postId, blk.textForm);
              setBlocks(prev =>
                prev.map(b=> (b.id === blk.id ? { ...b, blockId: created.id} : b))
              );
            } else if (blk.variant === "code" && blk.codeForm) {
              const created = await createCodeBlock(postId, blk.codeForm);
              setBlocks(prev =>
                prev.map(b=> (b.id === blk.id ? { ...b, blockId: created.id} : b))
              );
            }
          }
        }
      } else {
        const postResp = await createPost(postForm);
        postId = postResp?.postId ?? postResp?.id;
        if (!postId) throw new Error("Post ID 없음");

        for (const blk of blocks) {
          if (blk.variant === "text" && blk.textForm) {
            const t: TextCommand = {
              content: blk.textForm.content
            };
            await createTextBlock(postId, t);
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
      }
      alert(isEditMode ? "수정 완료!" : "저장 완료!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(isEditMode ? "수정 실패" : "저장 실패");
    }
  };

  const handleDeleteBlock = async (idToDelete: number) => {
    let postId: number;
    postId = isEditMode && id ? Number(id) : -1;

    console.log("postid:" + postId);
    const block = blocks.find(b => b.id === idToDelete);
    if (!block) return;
    
    console.log("block:", block);
    if (postId === -1 || block.blockId === undefined) {
      setBlocks(blocks.filter(b => b.id !== idToDelete));
      return;
    }
    try {
      await deleteBlock(postId, block.blockId!);
      setBlocks(blocks.filter(b => b.id !== idToDelete));
    } catch (err) {
      console.error(err);
      alert("블럭 삭제 실패");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

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
            <div key={block.id} className={styles.blockContainer}>
              <button
                type="button"
                onClick={() => handleDeleteBlock(block.id)}
                className={styles.blockRemove}
              >
                삭제
              </button>
              <Block
                variant={block.variant}
                textForm={block.textForm}
                codeForm={block.codeForm}
                onTextChange={(next) => updateTextBlock(block.id, next)}
                onCodeChange={(next) => updateCodeBlock(block.id, next)}
              />
            </div>
          ))}

        </div>

        {/* 블럭 추가 버튼 */}
        <div className={styles.button}>
          <Button variant="add" onClick={() => addBlock("code")}>+ 코드 스니펫 추가</Button>
          <Button variant="add" onClick={() => addBlock("text")}>+ 해설 추가</Button>
        </div>

        {/* 저장 버튼 */}
        <Button variant="save" onClick={handleSave}>{isEditMode ? "수정" : "저장"}</Button>
      </div>
    </div>
  );
};

export default CreatePostPage;