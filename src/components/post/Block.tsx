import styles from "./Block.module.css";
import type { TextCommand, CodeCommand, Language } from "../../models/Block";
import { LANGUAGES } from "../../utils/language";
import { Button } from "./Button";
import { Input } from "./Input";


type BlockVariant = "code" | "text";

interface BlockProps {
  variant: BlockVariant;
  textForm?: TextCommand;
  codeForm?: CodeCommand;
  onTextChange?: (next: TextCommand) => void;
  onCodeChange?: (next: CodeCommand) => void;
}

export const Block: React.FC<BlockProps> = ({ variant, textForm, codeForm, onTextChange, onCodeChange }) => {
  if (variant === "text") {
    return (
      <Input 
        placeholder="설명을 추가하세요" 
        variant="plain"
        value={textForm?.content ?? ""}
        onChange={(e) => onTextChange?.({ content: e.target.value })}
      />
    );
  }

  return (
    <div className={styles.codeContainer}>
      <div className={styles.topBar}>
        <Button variant="hashtag">+ 알고리즘 추가</Button>
        <label className={styles.label}>시간</label>
        <Input 
          variant="mini"
          placeholder=" 0 ms"
          value={codeForm?.perform_time ?? ""}
          onChange={(e) => onCodeChange?.({ ...codeForm!, perform_time: e.target.value })}
        />
        <label className={styles.label}>메모리</label>
        <Input 
          variant="mini"
          placeholder=" 0 KB"
          value={codeForm?.perform_mem ?? ""}
          onChange={(e) => onCodeChange?.({ ...codeForm!, perform_mem: e.target.value })}
        />
        <label className={styles.label}>사용 언어</label>
        <select
          className={styles.select}
          value={codeForm?.language ?? ""}
          onChange={(e) => onCodeChange?.({ ...codeForm!, language: e.target.value as Language })}
        >
          <option value="">사용 언어</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <Input
        className={styles.code}
        variant="plain"
        placeholder="코드를 작성하세요"
        value={codeForm?.content ?? ""}
        onChange={(e) => onCodeChange?.({ ...codeForm!, content: e.target.value })}
      />
    </div>
  );
};
