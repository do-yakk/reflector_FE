import type React from "react";
import styles from "./Login.module.css";
import Logo from "../assets/logo.png";

const LoginPage: React.FC = () => {
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
                        <input className={styles.formInput} type="text" placeholder="이메일을 입력하세요." />
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formTitle}>비밀번호</div>
                        <input className={styles.formInput} type="text" placeholder="비밀번호를 입력하세요." />
                    </div>
                    <div className={styles.nextButton}>
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