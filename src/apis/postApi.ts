import api from './axios';

export const hashtagList = async (): Promise<any> => {
    try {
      const response = await api.get(`/posts/hashtags`);
      console.log(response.data);
      
      if (response.data.code !== 'COMMON200') {
        throw new Error(`해시태그 목록 조회 실패: ${response.data.message}`);
      }
      return response.data;
    } catch (error) {
      console.error('해시태그 목록 조회 실패:', error);
      throw error;
    }
}

export const postList = async (hashtag: string): Promise<any> => {
    try {
        const response = await api.get(`/posts/sorted`, {
            params: {
                sort: "UPDATED_AT",
                direction: "DESC",
                page: 0,
                size: 5,
                hashtag: hashtag
            }
        })
        if (response.data.code !== 'COMMON200') {
                throw new Error(`게시물 목록 조회 실패: ${response.data.message}`);
        }
        return response.data;
    } catch (error) {
        console.error('게시물 목록 조회 실패: ', error);
        throw error;
    }
}
