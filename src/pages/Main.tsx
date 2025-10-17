import type React from "react";
import styles from "./Main.module.css";
import Tracker from "../components/Tracker";

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
                    <div className={styles.post}>
                        <div className={styles.title}>배열에서 K번째 수 찾기</div>
                        <div className={styles.info}>
                            <div className={styles.number}>1300</div>
                            <div className={styles.level}>골드 II</div>
                        </div>
                        <div className={styles.divider}/>
                        <div className={styles.miniHashtag}>이진탐색</div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.title}>최단 경로 구하기</div>
                        <div className={styles.info}>
                            <div className={styles.number}>1753</div>
                            <div className={styles.level}>골드V</div>
                        </div>
                        <div className={styles.divider}/>
                        <div className={styles.miniHashtag2}>다익스트라</div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.plus}>+</div>
                    </div>
                </div>
            </div>
            {/* 해시태그1 게시물 컨테이너 */}
            <div className={styles.postContainer}>
                <div className={styles.hashTag1}>
                    다익스트라
                </div>
                <div className={styles.postList}>
                    <div className={styles.post}>
                        <div className={styles.title}>최단 경로 구하기</div>
                        <div className={styles.info}>
                            <div className={styles.number}>1753</div>
                            <div className={styles.level}>골드V</div>
                        </div>
                        <div className={styles.divider}/>
                        <div className={styles.miniHashtag2}>다익스트라</div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.plus}>+</div>
                    </div>
                </div>
            </div>
            {/* 해시태그2 게시물 컨테이너 */}
            <div className={styles.postContainer}>
                <div className={styles.hashTag2}>
                    이진탐색
                </div>
                <div className={styles.postList}>
                    <div className={styles.post}>
                        <div className={styles.title}>배열에서 K번째 수 찾기</div>
                        <div className={styles.info}>
                            <div className={styles.number}>1300</div>
                            <div className={styles.level}>골드 II</div>
                        </div>
                        <div className={styles.divider}/>
                        <div className={styles.miniHashtag}>이진탐색</div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.plus}>+</div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default MainPage;