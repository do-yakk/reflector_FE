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

const fallbackCodeForm: CodeCommand = {
  content: "",
  language: "C",
  perform_time: "",
  perform_mem: "",
  hashtags: [],
};

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

  const currentCodeForm = codeForm ?? fallbackCodeForm;
  const hashtags = currentCodeForm.hashtags ?? [];

  const handleAddHashtag = () => {
    const nextHashtags = [...hashtags, ""];
    onCodeChange?.({
      ...currentCodeForm,
      hashtags: nextHashtags,
    });
  };

  const handleHashtagChange = (index: number, value: string) => {
    const nextHashtags = hashtags.map((tag, idx) => (idx === index ? value : tag));
    onCodeChange?.({
      ...currentCodeForm,
      hashtags: nextHashtags,
    });
  };

  const handleRemoveHashtag = (index: number) => {
    const nextHashtags = hashtags.filter((_, idx) => idx !== index);
    onCodeChange?.({
      ...currentCodeForm,
      hashtags: nextHashtags,
    });
  };

  return (
    <div className={styles.codeContainer}>
      <div className={styles.topBar}>
        <Button variant="hashtag" type="button" onClick={handleAddHashtag}>
          + 알고리즘 추가
        </Button>
        <label className={styles.label}>시간</label>
        <Input 
          variant="mini"
          placeholder=" 0 ms"
          value={currentCodeForm.perform_time ?? ""}
          onChange={(e) => onCodeChange?.({ ...currentCodeForm, perform_time: e.target.value })}
        />
        <label className={styles.label}>메모리</label>
        <Input 
          variant="mini"
          placeholder=" 0 KB"
          value={currentCodeForm.perform_mem ?? ""}
          onChange={(e) => onCodeChange?.({ ...currentCodeForm, perform_mem: e.target.value })}
        />
        <label className={styles.label}>사용 언어</label>
        <select
          className={styles.select}
          value={currentCodeForm.language ?? ""}
          onChange={(e) => onCodeChange?.({ ...currentCodeForm, language: e.target.value as Language })}
        >
          <option value="">사용 언어</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      {hashtags.length > 0 && (
        <div className={styles.hashtagList}>
          {hashtags.map((tag, index) => (
            <div key={`hashtag-${index}`} className={styles.hashtagItem}>
              <Input
                className={styles.hashtagInput}
                variant="mini"
                placeholder="#알고리즘"
                rows={1}
                value={tag}
                onChange={(e) => handleHashtagChange(index, e.target.value)}
              />
              <button
                type="button"
                className={styles.removeHashtag}
                onClick={() => handleRemoveHashtag(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <Input
        className={styles.code}
        variant="plain"
        placeholder="코드를 작성하세요"
        value={currentCodeForm.content ?? ""}
        onChange={(e) => onCodeChange?.({ ...currentCodeForm, content: e.target.value })}
      />
    </div>
  );
};
