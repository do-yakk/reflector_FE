import React, { useState } from "react";
import type { Site, Level, CreatePostRequest } from "../../models/Post.ts";
import { LEVEL_BY_SITE, LEVEL_DISPLAY } from "../../utils/level.ts";
import update from "immutability-helper";
import styles from "./Post.module.css";
import { Input } from "./Input.tsx";

const Post: React.FC = () => {
    const defaultSite = Object.keys(LEVEL_BY_SITE)[0] as Site;
    const [form, setForm] = useState<CreatePostRequest>({
        title: "제목을 입력해주세요.",
        site: defaultSite,
        level: LEVEL_BY_SITE[defaultSite][0] as Level,
        content: "",
        input: "",
        output: "",
        limit_time: "",
        limit_mem: ""
    });

    return (
        <div className={ styles.post }>
            <Input
                variant="title"
                placeholder="제목을 입력해주세요."
                required
                value={form.title}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm(update(form, {title: {$set: e.target.value}}))
                }
            />
            <div className={styles.topBar}>
                <label className={styles.label}>사이트</label>
                <select className={styles.select}
                    value={form.site}
                    onChange={(e) =>
                        setForm(update(form, {
                                site: { $set: e.target.value as Site },
                                level: { $set: "" as Level } }))}
                    required>
                    {Object.keys(LEVEL_BY_SITE).map((siteKey) => (
                        <option key={siteKey} value={siteKey}>{siteKey}</option>
                    ))}
                </select>
                <label className={styles.label}>난이도</label>
                <select className={styles.select}
                    value={form.level}
                    onChange={(e) =>
                        setForm(update(form, { level: { $set: e.target.value as Level } }))
                    }
                    required>
                    {form.site &&
                        LEVEL_BY_SITE[form.site]?.map((lvl) => (
                        <option key={lvl} value={lvl}>
                            {LEVEL_DISPLAY[lvl]}
                        </option>
                        ))}
                </select>
            </div>
            {form.site === "BAEKJOON" && <div className={styles.topBar}>
                <label className={styles.label}>시간 제한</label>
                <span className={styles.label}>|</span>
                <Input 
                    variant="mini"
                    placeholder=" 0 ms"
                    value={form.limit_time}
                    onChange={(e) => setForm(update(form, {limit_time: {$set: e.target.value}}))}
                />
                <label className={styles.label}>메모리 제한</label>
                <span className={styles.label}>|</span>
                <Input 
                    variant="mini"
                    placeholder=" 0 KB"
                    value={form.limit_mem}
                    onChange={(e) => setForm(update(form, {limit_mem: {$set: e.target.value}}))}
                    />
            </div>} 
            <div className={styles.bigLabel} >문제</div>
            <Input
                variant="plain"
                placeholder="내용을 입력해주세요."
                required
                value={form.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm(update(form, {content: {$set: e.target.value}}))
                }
            />
            <div className={styles.bigLabel} >입력</div>
            <Input
                variant="plain"
                placeholder="내용을 입력해주세요."
                required
                value={form.input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm(update(form, {input: {$set: e.target.value}}))
                }
            />
            <div className={styles.bigLabel} >출력</div>
            <Input
                variant="plain"
                placeholder="내용을 입력해주세요."
                required
                value={form.output}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm(update(form, {output: {$set: e.target.value}}))
                }
            />
            <div className={styles.splitLine} />
        </div>
        
    );
}

export default Post;