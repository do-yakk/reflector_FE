import type React from "react";
import styles from "./PostContainer.module.css"
import Post from "./Post";
import CreateButton from "./CreateButton";

const PostContainer: React.FC = () => {
    return (
        <>
        <div className={styles.postContainer}>
            <div className={styles.hashTag1}>
                다익스트라
            </div>
            <div className={styles.postList}>
                <Post />
                <CreateButton />
            </div>
        </div>
        </>
    );
}

export default PostContainer;