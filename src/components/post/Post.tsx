import React from "react";
import type { PostCommand } from "../../models/Post.ts";
import { LEVEL_BY_SITE, LEVEL_DISPLAY } from "../../utils/level.ts";
import styles from "./Post.module.css";
import { Input } from "./Input.tsx";

interface PostProps {
  form: PostCommand;
  onChange: (form: PostCommand) => void;
}

const Post: React.FC<PostProps> = ({ form, onChange }) => {
  const handleInputChange = (key: keyof PostCommand, value: string) => {
    onChange({ ...form, [key]: value });
  };

  return (
    <div className={styles.post}>
      {/* 제목 */}
      <Input
        variant="title"
        placeholder="제목을 입력해주세요."
        required
        value={form.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />

      {/* 사이트 / 난이도 */}
      <div className={styles.topBar}>
        <label className={styles.label}>사이트</label>
        <select
          className={styles.select}
          value={form.site}
          onChange={(e) => handleInputChange("site", e.target.value)}
          required
        >
          {Object.keys(LEVEL_BY_SITE).map((siteKey) => (
            <option key={siteKey} value={siteKey}>
              {siteKey}
            </option>
          ))}
        </select>

        <label className={styles.label}>난이도</label>
        <select
          className={styles.select}
          value={form.level}
          onChange={(e) => handleInputChange("level", e.target.value)}
          required
        >
          {LEVEL_BY_SITE[form.site]?.map((lvl) => (
            <option key={lvl} value={lvl}>
              {LEVEL_DISPLAY[lvl]}
            </option>
          ))}
        </select>
      </div>

      {/* 시간/메모리 제한 */}
      {form.site === "BAEKJOON" && (
        <div className={styles.topBar}>
          <label className={styles.label}>시간 제한</label>
          <Input
            variant="mini"
            placeholder=" 0 ms"
            value={form.limit_time}
            onChange={(e) => handleInputChange("limit_time", e.target.value)}
          />
          <label className={styles.label}>메모리 제한</label>
          <Input
            variant="mini"
            placeholder=" 0 KB"
            value={form.limit_mem}
            onChange={(e) => handleInputChange("limit_mem", e.target.value)}
          />
        </div>
      )}

      {/* 문제 / 입력 / 출력 */}
      <div className={styles.bigLabel}>문제</div>
      <Input
        variant="plain"
        placeholder="내용을 입력해주세요."
        required
        value={form.content}
        onChange={(e) => handleInputChange("content", e.target.value)}
      />

      <div className={styles.bigLabel}>입력</div>
      <Input
        variant="plain"
        placeholder="내용을 입력해주세요."
        required
        value={form.input}
        onChange={(e) => handleInputChange("input", e.target.value)}
      />

      <div className={styles.bigLabel}>출력</div>
      <Input
        variant="plain"
        placeholder="내용을 입력해주세요."
        required
        value={form.output}
        onChange={(e) => handleInputChange("output", e.target.value)}
      />

      <div className={styles.splitLine} />
    </div>
  );
};

export default Post;
