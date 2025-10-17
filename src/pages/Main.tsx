import type React from "react";
import styles from "./Main.module.css";
import Tracker from "../components/Tracker";
import Post from "../components/Post";
import CreateButton from "../components/CreateButton";

const MainPage: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
            {/* 학습 트래커 컨테이너 */}
            <Tracker />
            {/* 최근 게시물 컨테이너 */}
            <div className={styles.postContainer}>
                <div className={styles.recentlyTag}>
                    recently
                </div>
                <div className={styles.postList}>
                    <Post/>
                    <Post/>
                    <CreateButton />
                </div>
            </div>
            {/* 해시태그1 게시물 컨테이너 */}
            <div className={styles.postContainer}>
                <div className={styles.hashTag1}>
                    다익스트라
                </div>
                <div className={styles.postList}>
                    <Post />
                    <CreateButton />
                </div>
            </div>
            {/* 해시태그2 게시물 컨테이너 */}
            <div className={styles.postContainer}>
                <div className={styles.hashTag2}>
                    이진탐색
                </div>
                <div className={styles.postList}>
                    <Post />
                    <CreateButton />
                </div>
            </div>
            </div>
        </>
    );
}

export default MainPage;