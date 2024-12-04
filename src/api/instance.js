import axios from 'axios';

// .env로 숨긴 URL 주소
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
const ETRI_URL = process.env.REACT_APP_ETRI_API_URL;
const ETRI_API_KEY = process.env.REACT_APP_ETRI_API_KEY;

// Axios 기본 인스턴스
const defaultInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const etriInstance = axios.create({
  baseURL: ETRI_URL,
  headers: {
    Authorization: ETRI_API_KEY,
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

// 추가 API 인스턴스
// const createInstance = (baseInstance, path) => {
//   const instance = axios.create(baseInstance.defaults);
//   instance.defaults.baseURL += path;
//   return instance;
// };

export { defaultInstance, etriInstance };
