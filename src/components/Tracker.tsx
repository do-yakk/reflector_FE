import type React from "react";
import styles from "./Tracker.module.css";
import { useState, useEffect } from "react";
import { trackerData } from "../apis/userApi";
import { useNavigate } from "react-router-dom";

interface DayData {
  date: string;     // YYYY-MM-DD
  count: number;    // 활동 횟수
}

const Tracker: React.FC = () => {

    const startDate = new Date("2025-01-01");
    const daysInYear = 365;

    const navigate = useNavigate();
    const [data, setData] = useState<DayData[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }

        handleTrackerDate();
    }, []);

    const handleTrackerDate = async () => {
        try {
            const response = await trackerData();
            setData(response.data);
            return response.data;
        } catch (error) {
            console.error("트래커 데이터 불러오기 실패: ", error);
        }
    }

    const displayData = Array.from({ length: daysInYear }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateString = date.toISOString().slice(0, 10);

    const dayData = data.find(d => d.date === dateString);
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
            <div className={styles.tracker}>
                <div className={styles.year}>2025</div>
                <div className={styles.trackerGrid}>
                    {displayData.map(day => (
                        <div
                            key={day.date}
                            className={[styles.trackerCell, styles[`level${getLevel(day.count)}`]].join(' ')}
                            title={day.date ? `${day.date}: ${day.count}` : ``}
                        />
                    ))}
                </div>
            </div>
        </>
    );

}

export default Tracker;