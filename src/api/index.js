import axios from 'axios';

export const API = axios.create({
    // baseURL: 'https://facepizza-cheese.site',  
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiPost = async (endpoint, body = {}, token = null) => {
    try {
      const response = await API.post(endpoint, body, {
        headers: {
          'Authorization': token ? `Token ${token}` : undefined,
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      // Handle error
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('API 요청 실패:', error.response.data);
        throw new Error(error.response.data.detail || 'API 요청 실패');
      } else if (error.request) {
        // Request was made but no response was received
        console.error('API 요청 실패:', error.request);
        throw new Error('API 요청 실패: 서버 응답 없음');
      } else {
        // Something happened in setting up the request
        console.error('API 요청 실패:', error.message);
        throw new Error(error.message || 'API 요청 실패');
      }
    }
  };