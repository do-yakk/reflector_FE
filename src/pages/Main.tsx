import type React from "react";
import styles from "./Main.module.css";
import Tracker from "../components/Tracker";
import PostContainer from "../components/post_overview/PostContainer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hashtagList } from "../apis/postApi";

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [sortType, setsortType] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }

        handleHashtag();
    }, []);

    const handleHashtag = async () => {
        try {
            const response = await hashtagList();
            console.log(response);
            setsortType(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <div className={styles.container}>
                {/* 학습 트래커 컨테이너 */}
                <Tracker />
                {/* 게시글 목록 */}
                {sortType.map((tag) => (
                    <PostContainer key={tag} hashTag={tag} />
                ))}
            </div>
        </>
    );
}

export default MainPage;