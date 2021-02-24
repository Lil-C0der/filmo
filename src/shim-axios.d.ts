import axios from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
  }
}

declare global {
  namespace dataTypes {
    // 热映电影数据
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

    // 电影详情数据
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
      musicStar: string; // 原声歌手
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

    // 电影演职员数据
    interface IMovieCeleb {
      celebrities: Array<{
        avatar: string; // 照片
        cnm: string; // 中文名
        cr: number;
        desc: string; // 简介
        enm: string; // 英文名
        id: number; // 演职员 id
        ocr: number;
        roles: string; // 扮演的角色名
        still: string; // 剧中照片
      }>;
      titleCount: { count: number; cr: number; title: string };
    }
    type movieCelebsResponseData = {
      data: { relations: Array<IMovieCeleb> };
    };

    // 单条评论数据
    interface ICommentInfo {
      approve: number; // 收到的赞
      assistAwardInfo: {
        avatar: string;
        celebrityId: number;
        celebrityName: string;
        rank: number;
        title: string;
      };
      avatarurl: string; // 用户头像
      cityName: string; // 用户所在城市
      content: string; // 评论内容
      id: number; // 该条评论的 id
      isMajor: boolean;
      juryLevel: number;
      movieId: number;
      nick: string;
      nickName: string;
      oppose: number;
      pro: boolean;
      reply: number;
      score: number;
      spoiler: number;
      startTime: string;
      supportComment: boolean;
      supportLike: boolean;
      sureViewed: number;
      time: string;
      userId: number; // 用户 id
      userLevel: number; // 用户等级
      vipType: number;
    }
    // 单条热评数据
    interface IHotCommentInfo extends ICommentInfo {
      tagList: {
        fixed: Array<{ id: number; name: string }>;
      };
    }
    type commentResponseData = {
      cmts: Array<ICommentInfo>;
      hcmts: Array<IHotCommentInfo>;
    };

    interface IRelatedMovie {
      desc: number; // id
      globalRelease: boolean;
      img: string; // 电影海报
      onlinePlay: boolean;
      sc: string; // 评分
      title: string; // 电影名称
      type: string;
      wishNum: number;
    }
    type relatedMovieResponseData = {
      data: Array<{ items: Array<IRelatedMovie>; title: string }>;
    };

    interface IVideoInfo {
      approve: number;
      comment: number;
      count: number;
      createdTime: string;
      id: number;
      img: string; // 视频封面图
      isApprove: boolean;
      logoVideoUrl: url;
      movieId: number; // 电影的 id
      movieName: string;
      pubTime: string;
      score: number;
      shareInfo: {
        channel: number;
        content: string;
        img: string;
        title: string;
        url: string;
      };
      showSt: number;
      tl: string; // 视频标题
      tm: number;
      type: number;
      url: string; // 视频地址
      wish: number;
    }
    type videoResponseData = {
      vlist: Array<IVideoInfo>;
      movieVO: {
        category: string;
        globalReleased: boolean;
        image: string;
        longVideoSchema: string;
        longVideoStatus: number;
        movieType: number;
        name: string;
        pubTime: string;
        pubdesc: string;
        score: number;
        scoreLabel: string;
        showSt: number;
        ver: string;
        vodPlay: boolean;
        wish: number;
        wishst: number;
      };
    };
  }
}
