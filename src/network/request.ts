import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { baiduAK, tianAK } from '@constants/index';

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
  return resquestConf;
});

axiosInstance.interceptors.response.use(
  (result: AxiosResponse) => result.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
