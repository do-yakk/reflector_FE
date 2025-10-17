import type React from "react";
import styles from "./Main.module.css";
import Tracker from "../components/Tracker";
import PostContainer from "../components/posts/PostContainer";

const MainPage: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
            {/* 학습 트래커 컨테이너 */}
            <Tracker />
            {/* 최근 게시물 컨테이너 */}
            <PostContainer />
            {/* 해시태그1 게시물 컨테이너 */}
            <PostContainer />
            {/* 해시태그2 게시물 컨테이너 */}
            <PostContainer />
            </div>
        </>
    );
}

export default MainPage;