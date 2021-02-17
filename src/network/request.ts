import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.doubans.com/v2/movie/'
  // baseURL: 'https://127.0.0.1:8888/home'

  // baseURL: 'https://www.softeem.xin/maoyanApi/ajax',
  // baseURL: 'https://m.maoyan.com/ajax'
  baseURL: '/api'
});

axiosInstance.interceptors.response.use(
  (result: AxiosResponse) => result.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
