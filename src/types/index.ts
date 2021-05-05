// 百度地图 api 返回的当前位置坐标
export interface ILocaltionInfo {
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
export interface IMovieListObj {
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
  star?: string; // 电影演员明星
  wish: number;
}

// 电影详情数据
export interface IMovieInfo {
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

// 电影演职员数据
export interface IMovieCeleb {
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

// 单条评论数据
export interface ICommentInfo {
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
  time: string; // 发表时间，精确到分钟
  userId: number; // 用户 id
  userLevel: number; // 用户等级
}

// 单条热评数据
export interface IHotCommentInfo extends ICommentInfo {
  tagList: {
    fixed: Array<{ id: number; name: string }>;
  };
}
// 相关的电影
export interface IRelatedMovie {
  desc: number; // id
  img: string; // 电影海报
  onlinePlay: boolean;
  sc: string; // 评分
  title: string; // 电影名称
}

export interface IVideoInfo {
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

// 演员的详细信息
export interface ICastDetail {
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
  titleList?: Array<string>; // 头衔
  titles?: string;
  evaluation: ICastEvaluation | undefined;
  movieItems: ICastExperienceItem[] | undefined;
  musicItems: ICastExperienceItem[] | undefined;
  showItems: ICastExperienceItem[] | undefined;
  experienceItems: { content: string }[] | undefined;
  feelingItems: { content: string }[] | undefined;
  familyItems: { content: string }[] | undefined;
  quotes: { content: string }[] | undefined;
}

// 影人的评价
export interface ICastEvaluation {
  content: string;
  spokesman: string;
}
// 影人的经历
export interface ICastExperienceItem {
  content: string;
  year: number;
}

// 新闻列表 item
export interface INewsItem {
  id: string;
  ctime: string;
  title: string;
  description: string;
  source: string; // 来源
  picUrl: string;
  url: string; // 新闻 url
}

export interface IReply {
  userId: string;
  username: string;
  replyAt: string;
  content: string;
}

export interface IPost {
  id: string;
  title: string;
  creatorId: string;
  creatorUsername: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  // replies: IReply;
  repliesNum: number;
}

export interface IMovieOfUser {
  // id: string;
  id: number;
  nm: string;
  enm: string;
  imgUrl: string;
  star: string; // 主演
  fra: string; // 地区
  rt: string; //	上映时间
  sc: number; //	评分
  wish: number;
}

// 用户模型
export interface IUser {
  posts: IPost[];
  watchedList: any[];
  collectionList: IMovieOfUser[];
  id: string;
  username: string;
  createdAt: string;
}

export interface IUserLoginDetail extends IUser {
  pwd: string;
}
export interface IUserDetail extends IUser {}

export interface IPostDetail {
  id: string;
  title: string;
  creatorId: string;
  creatorUsername: string;
  content: string;
  createdAt: string;
  updateAt: string;
  replies: IReply[];
}

export interface ISearchMovieItem {
  cat: string;
  dir: string;
  // 时长
  dur: number;
  enm: string;
  id: number;
  img: string;
  movieAlias: string;
  nm: string;
  // '2018-12-14中国大陆上映'
  pubDesc: string;
  rt: string;
  sc: number;
  // '约翰·赵,米切尔·拉,黛博拉·梅辛'
  star: string;
  // 想看的人
  wish: number;
}
