import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ReadPost.module.css";
import { Button } from "../components/post/Button";
import type { PostInfo } from "../models/Post";
import type { Block as BlockModel } from "../models/Block";
import { getPost, getBlock } from "../apis/postApi";

const ReadPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          throw new Error("잘못된 경로입니다.");
        }
        const data = await getPost(Number(id));
        setPost(data);
      } catch (e: any) {
        setError(e?.message ?? "게시물 조회 실패");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className={styles.container}>로딩중...</div>;
  }
  if (error) {
    return <div className={styles.container}>에러: {error}</div>;
  }
  if (!post) {
    return <div className={styles.container}>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <Button variant="back" onClick={handleBackClick}>
        ←
      </Button>

    <div className={styles.container}>
      {/* post */}
      <div className={styles.post}>
        <div className={styles.title}>{post.title}</div>

        <div className={styles.topBar}>
          <label className={styles.label}>사이트</label>
          <label className={styles.value}>{post.site}</label>
          <label className={styles.label}>난이도</label>
          <label className={styles.value}>{post.level}</label>
        </div>
        {post.site === "BAEKJOON" && (
          <div className={styles.topBar}>
            <label className={styles.label}>시간 제한</label>
            <label className={styles.value}>{post.limitTime ?? "-"}</label>
            <label className={styles.label}>메모리 제한</label>
            <label className={styles.value}>{post.limitMem ?? "-"}</label>
          </div>
        )}

        <div className={styles.bigLabel}>문제</div>
        <div className={styles.content}>{post.content}</div>

        <div className={styles.bigLabel}>입력</div>
        <div className={styles.content}>{post.input}</div>

        <div className={styles.bigLabel}>출력</div>
        <div className={styles.content}>{post.output}</div>

        <div className={styles.splitLine} />
        
      </div>

      {/* blocks */}
      <div className={styles.blocks}>
          {post.blocks?.map((block: BlockModel) => {
            if (block.type === "TEXT") {
              return (
                <div className={styles.content}>{block.content}</div>
              );
            }
            return ( // block.type === "CODE"
              <div className={styles.codeContainer}>
                <div className={styles.hashtagList}>
                  {block.hashtags?.map((tag, idx) => (
                    <span key={`${block.id}-tag-${idx}`} style={{ background: "#D9D9D9", borderRadius: 8, padding: "4px 10px", fontSize: 14 }}>
                      {tag}
                    </span>
                  ))}
                  
                  <label className={styles.label}>시간</label>
                  <span>{block.perform_time ?? "-"}</span>
                  <label className={styles.label}>메모리</label>
                  <span>{block.perform_mem ?? "-"}</span>
                  <label className={styles.label}>사용 언어</label>
                  <span>{block.language}</span>
                </div>
                <div className={styles.code}>{block.content}</div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ReadPostPage;

