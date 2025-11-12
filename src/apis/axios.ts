import axios from 'axios';

/**
 * Axios 인스턴스 생성
 * - 기본 URL, 쿠키 전송, 헤더 설정
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * 요청 인터셉터
 * - 요청이 서버로 전송되기 전에 실행
 */
api.interceptors.request.use(
  (config) => {
    // 유저 토큰 설정
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
);

/**
 * 응답 인터셉터
 * - 서버로부터 받은 응답이 then/catch 핸들러로 전달되기 전에 실행
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 인증 실패 시 토큰 제거 후 로그인 화면으로 이동
    if (error.response?.data.code === "COMMON401") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;