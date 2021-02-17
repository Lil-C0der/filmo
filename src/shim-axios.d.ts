import axios from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
  }
}

declare global {
  namespace dataTypes {
    interface IMovieListObj {
      globalReleased: boolean; // 全球上映
      haspromotionTag: boolean; // 是否有推荐标识
      id: number; // 电影编号
      // 电影图片的URL地址，
      // 请将图片地址中的”w.h”更改为”128.180”
      // “128.180”是图片的大小
      img: string;
      nm: string; // 电影名称
      preShow: boolean; // 是否是预告片
      rt: string; //	上映时间
      sc: string; // 电影评分
      showInfo: string; // 电影的上映信息
      showst: number; // 无实际意义，用户请忽略
      star: string; // 电影演员明星
      version: string; // 电影版本
      wish: number; // 多少人想看
      wishst: number; // 无实际意义，用户请忽略
    }

    type hotMoviesResponseData = {
      coming: [];
      movieIds: Array<number>;
      movieList: Array<IMovieListObj>;
      stid: string; // 当前请求的随机状态码，请用户忽略
      stids: string; // 所有电影的随机状态码，请用户忽略
      total: number;
    };
  }
}
