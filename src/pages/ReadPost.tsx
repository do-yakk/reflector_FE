import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { Button } from "../components/post/Button";
import type { PostInfo } from "../models/Post";
import type { Block as BlockModel } from "../models/Block";
import { getPost } from "../apis/postApi";

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
        {/* 제목 */}
        <div style={{ marginBottom: 12, fontSize: 28, fontWeight: 600 }}>
          {post.title}
        </div>

        {/* 사이트 / 난이도 / 제한 */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 10 }}>
          <span style={{ color: "gray", fontWeight: 600, fontSize: 20 }}>사이트</span>
          <span style={{ fontSize: 20 }}>{post.site}</span>
          <span style={{ color: "gray", fontWeight: 600, fontSize: 20 }}>난이도</span>
          <span style={{ fontSize: 20 }}>{post.level}</span>
          {post.site === "BAEKJOON" && (
            <>
              <span style={{ color: "gray", fontWeight: 600, fontSize: 20 }}>시간 제한</span>
              <span style={{ fontSize: 20 }}>{post.limitTime ?? "-"}</span>
              <span style={{ color: "gray", fontWeight: 600, fontSize: 20 }}>메모리 제한</span>
              <span style={{ fontSize: 20 }}>{post.limitMem ?? "-"}</span>
            </>
          )}
        </div>

        {/* 문제 / 입력 / 출력 */}
        <div style={{ color: "gray", fontWeight: 600, fontSize: 20, marginTop: 12 }}>문제</div>
        <div style={{ fontSize: 18, whiteSpace: "pre-wrap" }}>{post.content}</div>

        <div style={{ color: "gray", fontWeight: 600, fontSize: 20, marginTop: 12 }}>입력</div>
        <div style={{ fontSize: 18, whiteSpace: "pre-wrap" }}>{post.input}</div>

        <div style={{ color: "gray", fontWeight: 600, fontSize: 20, marginTop: 12 }}>출력</div>
        <div style={{ fontSize: 18, whiteSpace: "pre-wrap" }}>{post.output}</div>

        <div className={styles.splitLine} />

        {/* 블럭들 */}
        <div className={styles.blocks}>
          {post.blocks?.map((block: BlockModel) => {
            if (block.type === "TEXT") {
              return (
                <div key={block.id} style={{ marginBottom: 12, fontSize: 18, whiteSpace: "pre-wrap" }}>
                  {block.content}
                </div>
              );
            }
            // CODE
            return (
              <div key={block.id} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  {block.hashtags?.map((tag, idx) => (
                    <span key={`${block.id}-tag-${idx}`} style={{ background: "#D9D9D9", borderRadius: 8, padding: "4px 10px", fontSize: 14 }}>
                      {tag}
                    </span>
                  ))}
                  <span style={{ color: "gray", fontWeight: 600 }}>시간</span>
                  <span>{block.perform_time ?? "-"}</span>
                  <span style={{ color: "gray", fontWeight: 600 }}>메모리</span>
                  <span>{block.perform_mem ?? "-"}</span>
                  <span style={{ color: "gray", fontWeight: 600 }}>사용 언어</span>
                  <span>{block.language}</span>
                </div>
                <pre style={{ background: "#F0E7D1", borderRadius: 6, padding: 10, overflowX: "auto", whiteSpace: "pre-wrap" }}>
{block.content}
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReadPostPage;

