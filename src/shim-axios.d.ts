import axios from 'axios';
import {
  IPost,
  IUserDetail,
  IReply,
  IUserLoginDetail,
  ICastDetail,
  ICastEvaluation,
  ICastExperienceItem,
  IVideoInfo,
  IRelatedMovie,
  ICommentInfo,
  IHotCommentInfo,
  IMovieCeleb,
  IMovieInfo,
  IMovieListObj,
  INewsItem,
  IPostDetail
} from './types/index';
declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
  }
}

declare global {
  namespace dataTypes {
    type hotAndCommingMovieListResponseData = {
      data: {
        hot: Array<IMovieListObj>;
        coming: Array<IMovieListObj>;
        total: number;
      };
    };

    type movieInfoResponseData = {
      detailMovie: IMovieInfo;
    };

    type movieCelebsResponseData = {
      data: { relations: Array<IMovieCeleb> };
    };

    type commentResponseData = {
      cmts: Array<ICommentInfo>;
      hcmts: Array<IHotCommentInfo>;
    };

    type relatedMovieResponseData = {
      data: Array<{ items: Array<IRelatedMovie>; title: string }>;
    };

    // 电影相关的视频，例如预告片等

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

    type castResponseData = {
      data: ICastDetail;
    };

    type castEvaluationResponseData = {
      data: {
        items?: ICastEvaluation[];
      };
    };

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

    type newsResponseData = {
      code: number;
      newslist: INewsItem[];
    };

    // 本地 nest api 响应类型
    type localResponseData<T> = {
      code: number;
      success: boolean;
      msg: string;
      data: T;
    };

    // 登录接口返回的结果
    type loginResponseData = localResponseData<{
      error?: string;
      user: IUserLoginDetail;
      token: string;
    }>;

    // 注册接口返回的结果
    type registerResponseData = localResponseData<{
      error?: string;
      user: IUserLoginDetail;
    }>;

    // 用户信息返回的结果
    type userDetailResponseData = localResponseData<{ user: IUserDetail }>;

    // 所有帖子列表
    type postsResponseData = localResponseData<{ posts: IPost[] }>;

    type postDetailResponseData = localResponseData<IPostDetail>;
    type postReplyResponseData = localResponseData<IPostDetail>;
  }
}
