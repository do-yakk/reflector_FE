import api from './axios';

export const login = async (email: string, password: string): Promise<any> => {
    try {
      const response = await api.post(`/users/login`, {
        email: email,
        password: password,
      });
      
      if (response.data.code !== 'COMMON200') {
        throw new Error(`로그인 실패: ${response.data.message}`);
      }
      return response;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
}

export const trackerData = async (): Promise<any> => {
    try {
        const year = new Date().getFullYear();
        const response = await api.get(`/users/study-tracker/${year}`);
        return response.data;
    } catch (error) {
        console.error('트래커 데이터 조회 실패: ', error);
        throw error;
    }
}