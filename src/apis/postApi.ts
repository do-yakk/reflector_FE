import type { TextCommand, CodeCommand } from '../models/Block';
import type { PostCommand } from '../models/Post';
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

export const postList = async (hashtag?: string): Promise<any> => {
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

export const createPost = async (post: PostCommand): Promise<any> => {
    try {
        const response = await api.post(`/posts`, post);
        return response.data?.data;
    } catch (error) {
        console.error('게시물 생성 실패: ', error);
        throw error;
    }
}

export const createTextBlock = async (postId: number, block: TextCommand): Promise<any> => {
    try {
        const response = await api.post(`/blocks/${postId}/text`, block);
        return response.data?.data;
    } catch (error) {
        console.error('텍스트 블럭 생성 실패: ', error);
        throw error;
    }
}

export const createCodeBlock = async (postId: number, block: CodeCommand): Promise<any> => {
    try {
        const response = await api.post(`/blocks/${postId}/code`, block);
        return response.data?.data;
    } catch (error) {
        console.error('코드 블럭 생성 실패: ', error);
        throw error;
    }
} 

export const getPost = async (postId: number): Promise<any> => {
    try {
        const response = await api.get(`/posts/${postId}`);
        return response.data?.data;
    } catch (error) {
        console.error('게시물 조회 실패: ', error);
        throw error;
    }
}

export const getBlock = async (postId: number, blockId: number): Promise<any> => {
    try {
        const response = await api.get(`/posts/${postId}/${blockId}`);
        return response.data?.data;
    } catch (error) {
        console.error('블럭 조회 실패: ', error);
        throw error;
    }
}

export const updatePost = async (postId:number, post: PostCommand): Promise<any> => {
    try {
        const response = await api.put(`/posts/${postId}`, post);
        return response.data?.data;
    } catch (error) {
        console.error('게시물 수정 실패: ', error);
        throw error;
    }
}

export const deletePost = async (postId: number): Promise<any> => {
    try {
        const response = await api.delete(`/posts/${postId}`);
        return response.data?.data;
    } catch (error) {
        console.error('게시물 삭제 실패: ', error);
        throw error;
    }
}

export const deleteBlock = async (postId: number, blockId: number): Promise<any> => {
    try {
        const response = await api.delete(`/blocks/${postId}/${blockId}`);
        return response.data?.data;
    } catch (error) {
        console.error('블럭 삭제 실패: ', error);
        throw error;
    }
}

export const updateTextBlock = async (postId:number, blockId: number, block: TextCommand): Promise<any> => {
    try {
        const response = await api.put(`/blocks/${postId}/text/${blockId}`, block);
        return response.data?.data;
    } catch (error) {
        console.error('텍스트 블럭 수정 실패: ', error);
        throw error;
    }
}

export const updateCodeBlock = async (postId:number, blockId: number, block: CodeCommand): Promise<any> => {
    try {
        const response = await api.put(`/blocks/${postId}/code/${blockId}`, block);
        return response.data?.data;
    } catch (error) {
        console.error('코드 블럭 수정 실패: ', error);
        throw error;
    }
}

export const deleteBlockAPI = async (postId: number,blockId: number): Promise<any> => {
    try {
        const response = await api.delete(`/blocks/${postId}/${blockId}`);
        return response.data?.data;
    } catch (error) {
        console.error('블럭 삭제 실패: ', error);
        throw error;
    }
}