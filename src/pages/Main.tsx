import type React from "react";
import styles from "./Main.module.css";

interface DayData {
  date: string;     // YYYY-MM-DD
  count: number;    // 활동 횟수
}

type YearData = DayData[]; 

const MainPage: React.FC = () => {
    const yearData: YearData = [
        { date: '2025-01-01', count: 2 },
        { date: '2025-01-02', count: 4 },
        { date: '2025-10-17', count: 3 }
    ];

    const startDate = new Date("2025-01-01");
    const daysInYear = 365;

    const displayData = Array.from({ length: daysInYear }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateString = date.toISOString().slice(0, 10);

    const dayData = yearData.find(d => d.date === dateString);
    const count = dayData ? dayData.count : 0;

    return { date: dateString, count };
    });
    
    function getLevel(count: number) {
        if (count === 0) return 0;
        if (count < 3) return 1;
        if (count < 6) return 2;
        if (count < 10) return 3;
        return 4;
    }

    return (
        <>
            <div className={styles.container}>
            {/* 학습 트래커 컨테이너 */}
            <div className={styles.tracker}>
                <div className={styles.year}>2025</div>
                <div className={styles.trackerGrid}>
                    {displayData.map(day => (
                        <div
                            key={day.date}
                            className={[styles.trackerCell, styles[`level${day.count}`]].join(' ')}
                            title={day.date ? `${day.date}: ${day.count}` : ``}
                        />
                    ))}
                </div>
            </div>
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