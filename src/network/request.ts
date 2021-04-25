import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { baiduAK, tianAK } from '@constants/index';

import store from '@store/index';

const axiosInstance = axios.create({
  baseURL: '/api'
});

axiosInstance.interceptors.request.use((resquestConf: AxiosRequestConfig) => {
  const { url } = resquestConf;
  if (url?.match(/^baidu/)) {
    resquestConf.params.ak = baiduAK;
  }
  if (url?.match(/^tian/)) {
    resquestConf.params.key = tianAK;
  }
  // 统一配置 token
  if (store.token || localStorage.getItem('user-token')) {
    const token = store.token || localStorage.getItem('user-token');
    console.log('token', token);
    resquestConf.headers = {
      // token
      Authorization: `Bearer ${token}`
    };
  }
  return resquestConf;
});

axiosInstance.interceptors.response.use(
  (result: AxiosResponse) => result.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
