import type React from "react";
import styles from "./Main.module.css";
import Tracker from "../components/Tracker";
import PostContainer from "../components/post_overview/PostContainer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hashtagList } from "../apis/postApi";
import CreateButton from "../components/post_overview/CreateButton";

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
                {sortType && sortType.length > 0 ? (
                    sortType.map((tag) => (
                        <PostContainer key={tag} hashTag={tag} />
                    ))
                ) : (
                    <div className={styles.empty}>
                        <div>지금 기록을 시작해보세요!</div>
                        <CreateButton />
                    </div>
                )}
                <PostContainer hashTag={"None"} />
            </div>
        </>
    );
}

export default MainPage;