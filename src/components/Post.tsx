import type React from "react";
import styles from "./Post.module.css";

const Post: React.FC = () => {
    return (
        <>
        <div className={styles.post}>
            <div className={styles.title}>배열에서 K번째 수 찾기</div>
            <div className={styles.info}>
                <div className={styles.number}>1300</div>
                <div className={styles.level}>골드 II</div>
            </div>
            <div className={styles.divider}/>
            <div className={styles.miniHashtag}>이진탐색</div>
        </div>
        </>
    );
}

export default Post;