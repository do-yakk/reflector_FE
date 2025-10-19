import type React from "react";
import styles from "./PostContainer.module.css"
import Post from "./Post";
import CreateButton from "./CreateButton";
import { getHashtagColor } from "../../constants/hashtagColors";


interface PostContainerProps {
    hashTag: string;
}

interface PostProps {
    title: string;
    number: number;
    level: string;
    hashTag: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ hashTag }) => {
    const posts: PostProps[] = [
        {
            title: "배열에서 K번째 수 찾기",
            number: 1300,
            level: "골드 II",
            hashTag: "이진탐색"
        }, 
        {
            title: "최단 거리 찾기",
            number: 1753,
            level: "골드 V",
            hashTag: "다익스트라"
        }
    ];

    return (
        <>
        <div className={styles.postContainer}>
            <div className={styles.hashTag} style={{ backgroundColor: getHashtagColor(hashTag) }}>
                {hashTag}
            </div>
            <div className={styles.postList}>
                {posts.map((post, i) => (
                    <Post key={i} title={post.title} number={post.number} level={post.level} hashTag={post.hashTag}/>
                ))}
                <CreateButton />
            </div>
        </div>
        </>
    );
}

export default PostContainer;