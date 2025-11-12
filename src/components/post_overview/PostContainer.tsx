import type React from "react";
import styles from "./PostContainer.module.css"
import Post from "./Post";
import CreateButton from "./CreateButton";
import { getHashtagColor } from "../../constants/hashtagColors";
import { postList } from "../../hooks/postApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface PostContainerProps {
    hashTag: string;
}

interface PostProps {
    postId: string,
    site: string,
    title: string,
    level: string
}

const PostContainer: React.FC<PostContainerProps> = ({ hashTag }) => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }

        handlePostList();
    }, [hashTag]);

    const handlePostList = async () => {
        try {
            const response = await postList(hashTag);
            setPosts(response.data.content);
            return response.data.content;
        } catch (error) {
            console.error("게시글 목록 조회 실패: ", hashTag, error);
        }
    }

    return (
        <>
        <div className={styles.postContainer}>
            <div className={styles.hashTag} style={{ backgroundColor: getHashtagColor(hashTag) }}>
                {hashTag}
            </div>
            <div className={styles.postList}>
                {posts.map((post, i) => (
                    <Post key={post.postId} title={post.title} number={1000} level={post.level} hashTag={hashTag}/>
                ))}
                <CreateButton />
            </div>
        </div>
        </>
    );
}

export default PostContainer;