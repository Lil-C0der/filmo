import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.doubans.com/v2/movie/'
  // baseURL: 'https://127.0.0.1:8888/home'

  baseURL: 'https://m.maoyan.com/ajax'
});

export default axiosInstance;
