import type React from "react";
import styles from "./Login.module.css";
import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../hooks/userApi";
import { AxiosError } from "axios";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const isButtonEnabled = email.trim() !== "" && password.trim() !== ""; 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    const handleLogin = async () => {
        if (!isButtonEnabled) return;

        setError("");

        try {
            const response = await login(email, password);
            console.log(response);
            const {accessToken} = response.data.data;
            localStorage.setItem("token", accessToken);

            navigate("/");
        } catch (error) {
            if (error instanceof AxiosError) {
                setError("로그인 실패: " + (error.response?.data?.message || "서버 오류"));
            } else {
                setError("로그인 실패: 알 수 없는 오류");
            }
        }


    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <img src={Logo} className={styles.logo}/>
                    <div className={styles.title}>알고리즘 오답노트 서비스</div>
                    <div className={styles.subTitle}>Reflector 계정에 로그인</div>
                </div>
                <div className={styles.loginForm}>
                    <div className={styles.formContainer}>
                        <div className={styles.formTitle}>이메일</div>
                        <input className={styles.formInput} type="text" placeholder="이메일을 입력하세요." value={email} onChange={(e) => {setEmail(e.target.value);}}/>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formTitle}>비밀번호</div>
                        <input className={styles.formInput} type="text" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => {setPassword(e.target.value);}}/>
                    </div>
                    <div className={styles.nextButton} onClick={handleLogin}>
                        로그인
                    </div>
                </div>
                <div className={styles.footer}>
                    <p>&copy; 2025 doyak, All rights reserved.</p>
                </div>
            </div>
        </>
    )

}

export default LoginPage;