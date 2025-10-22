import type React from "react";
import styles from "./Post.module.css";
import { getHashtagColor } from "../../constants/hashtagColors";
import { getLevelColor } from "../../constants/levelColors";

interface PostProps {
    title: string;
    number: number;
    level: string;
    hashTag: string;
}

const Post: React.FC<PostProps> = ({ title, number, level, hashTag }) => {
    return (
        <>
        <div className={styles.post}>
            <div className={styles.title}>{title}</div>
            <div className={styles.info}>
                <div className={styles.number}>{number}</div>
                <div className={styles.level} style={{ backgroundColor: getLevelColor(level) }}>{level}</div>
            </div>
            <div className={styles.divider}/>
            <div className={styles.miniHashtag} style={{ backgroundColor: getHashtagColor(hashTag) }}>{hashTag}</div>
        </div>
        </>
    );
}

export default Post;