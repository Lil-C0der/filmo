import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.doubans.com/v2/movie/'
  // baseURL: 'https://127.0.0.1:8888/home'

  // baseURL: 'https://www.softeem.xin/maoyanApi/ajax',
  // baseURL: 'https://m.maoyan.com/ajax'
  baseURL: '/api'
});

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

axiosInstance.interceptors.response.use();

export default axiosInstance;
