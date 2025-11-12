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