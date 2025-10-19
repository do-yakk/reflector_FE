import type React from "react";
import styles from "./PostContainer.module.css"
import Post from "./Post";
import CreateButton from "./CreateButton";

interface PostContainerProps {
    hashTag: string;
    index?: number;
}

interface PostProps {
    title: string;
    number: number;
    level: string;
    hashTag: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ hashTag , index = 0 }) => {
    const colors = ['#d4ebff', '#D5EDCC', '#FFE2E7']
    const color = colors[index % colors.length];
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
            <div className={styles.hashTag} style={{ backgroundColor: color }}>
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