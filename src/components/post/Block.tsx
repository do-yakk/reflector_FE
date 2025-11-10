import { useState } from "react";
import update from "immutability-helper";
import styles from "./Block.module.css";
import type { TextCommand, CodeCommand, Language } from "../../models/Block";
import { LANGUAGES } from "../../utils/language";
import { Button } from "./Button";
import { Input } from "./Input";


type BlockVariant = "code" | "text";

interface BlockProps {
    variant: BlockVariant;
}

export const Block: React.FC<BlockProps> = ({ variant }) => {
    const [textForm, setText] = useState<TextCommand>({
        content: ""
    });
    const [codeForm, setCode] = useState<CodeCommand>({
        content: "",
        language: "" as Language,
        perform_time: "",
        perform_mem: "",
        hashtags: []
    });

    if (variant === "text") {
        return (<Input 
                    placeholder="설명을 추가하세요" 
                    variant="plain"
                    value={textForm.content} 
                    onChange={(e) => setText({ ...textForm, content: e.target.value })}
                />);
    }
    return (
        <div className={ styles.codeContainer }>
            <div className={styles.topBar}>
                <Button variant="hashtag">+ 알고리즘 추가</Button>
                <label className={ styles.label }>시간</label>
                <span className={ styles.label }>|</span>
                <Input 
                    variant="mini"
                    placeholder=" 0 ms"
                    value={codeForm.perform_time}
                    onChange={(e) => setCode({ ...codeForm, perform_time: e.target.value })}
                />
                <label className={ styles.label }>메모리</label>
                <span className={ styles.label }>|</span>
                <Input 
                    variant="mini"
                    placeholder=" 0 KB"
                    value={codeForm.perform_mem}
                    onChange={(e) => setCode({ ...codeForm, perform_mem: e.target.value })}
                />
                <label className={ styles.label }>사용 언어</label>
                <span className={ styles.label }>|</span>
                <select
                    className={ styles.select }
                    value={codeForm.language}
                    onChange={(e) => setCode(update(codeForm, {language: {$set: e.target.value as Language}}))}
                    required>
                        <option value="">사용 언어</option>
                        {LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                </select>
            </div>
            <Input
                className={ styles.code }
                variant="plain"
                placeholder="코드를 작성하세요"
                value={codeForm.content}
                onChange={(e) => setCode({ ...codeForm, content: e.target.value })}
            />
        </div>
    );
    
}