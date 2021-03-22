import axios from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
  }
}

declare global {
  namespace dataTypes {
    // 百度地图 api 返回的当前位置坐标
    interface ILocaltionInfo {
      address: string;
      content: {
        address: string;
        address_detail: {
          city: string;
          city_code: number;
          district: string;
          province: string;
          street_number: string;
        };
        point: {
          x: string;
          y: string;
        };
      };
      status: number;
    }

    // 热映电影数据
    interface IMovieListObj {
      boxInfo: string; // 票房信息
      desc: string; // 主演
      id: number; // 电影编号
      // 电影图片的URL地址，
      // 请将图片地址中的”w.h”更改为”128.180”
      // “128.180”是图片的大小
      img: string;
      nm: string; // 电影名称
      fra: string; // 地区
      rt: string; //	上映时间
      sc: string; // 电影评分
      star: string; // 电影演员明星
      wish: number;
    }

    type hotAndCommingMovieListResponseData = {
      data: {
        hot: Array<IMovieListObj>;
        coming: Array<IMovieListObj>;
        total: number;
      };
    };

    interface IDouBanMovieItem {
      actors: string;
      director: string;
      duration: string;
      id: string;
      image: string;
      name: string;
      rating: string;
      region: string;
      release: string;
      release: string;
      votecount: string;
    }
    type doubanHotMoviesResponseData = {
      [key: string]: IDouBanMovieItem;
    };

    // 电影详情数据
    interface IMovieInfo {
      availableEpisodes: number; // 可用的插曲
      awardUrl: string; // url 地址
      cat: string; // 分类
      dir: string; // 导演,
      distributions: Array<{ movieScoreLevel: string; proportion: string }>;
      dra: string; // 简介
      dur: number; // 时长
      enm: string; // 英文名称
      episodeDur: string; // 时长
      id: number;
      img: string; // 海报 url
      musicName: string; // 电影原声
      musicStar: string; // 原声歌手
      nm: string; // 电影名称
      onSale: boolean; // 是否正在售票
      oriLang: string; // 电影语言
      photos: Array<string>; // 电影海报集
      pubDesc: string; //上映信息
      rt: string; //	电影上映时间
      sc: number;
      scm: string;
      snum: number; // 评分人数
      src: string; // 地区
      star: string; // 主演
      vd: string; // 预告片 url
      videoImg: string; // 预告片封面
      videourl: string;
      watched: number;
      wish: number;
      movieCelebs: IMovieCeleb[];
      movieComments: {
        cmts: ICommentInfo[];
        hcmts: IHotCommentInfo[];
      };
      relatedMovies: IRelatedMovie[];
      videos: IVideoInfo[];
    }
    type movieInfoResponseData = {
      detailMovie: IMovieInfo;
    };

    // 电影演职员数据
    interface IMovieCeleb {
      celebrities: Array<{
        avatar: string; // 照片
        cnm: string; // 中文名
        desc: string; // 简介
        enm: string; // 英文名
        id: number; // 演职员 id
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
      avatarurl: string; // 用户头像
      cityName: string; // 用户所在城市
      content: string; // 评论内容
      id: number; // 该条评论的 id
      movieId: number;
      nick: string;
      nickName: string;
      score: number; // 评分
      startTime: string; // 发表时间，精确到秒
      time: string; // 发表时间，精确到恩中
      userId: number; // 用户 id
      userLevel: number; // 用户等级
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

    // 相关的电影
    interface IRelatedMovie {
      desc: number; // id
      img: string; // 电影海报
      onlinePlay: boolean;
      sc: string; // 评分
      title: string; // 电影名称
    }
    type relatedMovieResponseData = {
      data: Array<{ items: Array<IRelatedMovie>; title: string }>;
    };

    // 电影相关的视频，例如预告片等
    interface IVideoInfo {
      count: number; // 播放次数
      createdTime: string; // 时间
      id: number;
      img: string; // 视频封面图
      movieId: number; // 电影的 id
      movieName: string;
      tl: string; // 视频标题
      tm: number;
      url: string; // 视频地址
    }
    type videoResponseData = {
      vlist: Array<IVideoInfo>;
      // movieVO: {
      //   category: string;
      //   globalReleased: boolean;
      //   image: string;
      //   longVideoSchema: string;
      //   longVideoStatus: number;
      //   movieType: number;
      //   name: string;
      //   pubTime: string;
      //   pubdesc: string;
      //   score: number;
      //   scoreLabel: string;
      //   showSt: number;
      //   ver: string;
      //   vodPlay: boolean;
      //   wish: number;
      //   wishst: number;
      // };
    };

    // 演员的详细信息
    interface ICastDetail {
      aliasName: string;
      avatar: string;
      birthday: string;
      birthplace: string;
      bloodType: string;
      cnm: string;
      company: string;
      constellation: string;
      deathDate: string;
      desc: string;
      enm: string;
      graduateSchool: string;
      height: number;
      id: number;
      nation: string; // 民族
      nationality: string;
      photoNum: number;
      photos: Array<string>;
      sexy: string;
      titleList: Array<string>; // 头衔
      titles: string;
      evaluation: ICastEvaluation | undefined;
      movieItems: ICastExperienceItem[] | undefined;
      musicItems: ICastExperienceItem[] | undefined;
      showItems: ICastExperienceItem[] | undefined;
      experienceItems: { content: string }[] | undefined;
      feelingItems: { content: string }[] | undefined;
      familyItems: { content: string }[] | undefined;
      quotes: { content: string }[] | undefined;
    }
    type castResponseData = {
      data: ICastDetail;
    };

    // 影人的评价
    interface ICastEvaluation {
      content: string;
      spokesman: string;
    }
    type castEvaluationResponseData = {
      data: {
        items?: ICastEvaluation[];
      };
    };

    // 影人的经历
    interface ICastExperienceItem {
      content: string;
      year: number;
    }
    type castExperienceResponseData = {
      data: {
        movieItems?: ICastExperienceItem[];
        musicItems?: ICastExperienceItem[];
        showItems?: ICastExperienceItem[];
      };
    };

    type castLifeResponseData = {
      data: {
        experienceItems?: { content: string }[];
        feelingItems?: { content: string }[];
        familyItems?: { content: string }[];
      };
    };

    // 影人的语录
    type castQuotesResponseData = {
      data: {
        items: { content: string }[];
      };
    };
  }
}
