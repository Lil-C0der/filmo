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

    interface IMovieInfo {
      albumImg: string; // 电影海报
      availableEpisodes: Number; // 可用的插曲
      awardUrl: string; // url 地址
      backgroundColor: string; // 背景颜色
      bingeWatch: number;
      bingeWatchst: number;
      cat: string; // 分类
      dir: string; // 导演,
      distributions: Array<{ movieScoreLevel: string; proportion: string }>;
      dra: string; // 简介
      dur: number; // 时长
      egg: boolean;
      enm: string; // 英文名称
      episodeDur: string; // 时长
      episodes: number;
      globalReleased: boolean;
      id: number;
      img: string;
      latestEpisode: number;
      modcsSt: boolean;
      movieType: number;
      multiPub: boolean;
      musicName: string; // 电影原声
      musicNum: number; // 原声数量
      musicStart: string; // 原声歌手
      nm: string; // 电影名称
      onSale: boolean; // 是否正在售票
      onlinePlay: boolean; // 可否在线播放
      orderSt: number;
      oriLang: string; // 电影语言
      photos: Array<string>; // 电影海报集
      preScorePersona: boolean;
      proScore: number;
      proScoreNum: number;
      pubDesc: string; //上映信息
      rt: string; //	电影上映时间
      sc: number;
      scm: string;
      scoreLabel: string;
      shareInfo: {
        channel: number;
        content: string;
        img: string;
        title: string;
        url: string;
      };
      showst: number;
      snum: number;
      src: string; // 地区
      star: string; // 主演
      type: number;
      vd: string; // 预告片 url
      ver: string;
      version: string;
      videoImg: string; // 预告片封面
      videourl: string;
      viewedSt: number;
      vnum: number;
      vodFreeSt: number;
      vodPlay: boolean;
      vodSt: number;
      watched: number;
      wish: number;
      wishst: number;
    }
    type movieInfoResponseData = {
      detailMovie: IMovieInfo;
    };
  }
}
