import type React from "react";
import styles from "./Main.module.css";
import Tracker from "../components/Tracker";
import PostContainer from "../components/post_overview/PostContainer";

const MainPage: React.FC = () => {
    const sortType = ['recently', '다익스트라', '이진탐색'];

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