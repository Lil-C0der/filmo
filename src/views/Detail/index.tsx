import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailTop from './detailTop';
import DetailBTM from './detailBTM';
import { Button } from 'woo-ui-react';

import {
  getMovieDetail,
  getMovieCeleb,
  getMovieComments,
  getRelatedMovies,
  getMovieVideos
} from '@network/movie';

import './_style.scss';

interface IMovieDetailParams {
  id: string;
}

// default
const defaultMovieDetail: dataTypes.IMovieInfo = {
  availableEpisodes: 0, // 可用的插曲
  awardUrl: '', // url 地址
  cat: '', // 分类
  dir: '', // 导演,
  distributions: [],
  dra: '', // 简介
  dur: 0, // 时长
  enm: '', // 英文名称
  episodeDur: '', // 时长
  id: 0,
  img: '', // 海报 url
  musicName: '', // 电影原声
  musicStar: '', // 原声歌手
  nm: '', // 电影名称
  onSale: false, // 是否正在售票
  oriLang: '', // 电影语言
  photos: [''], // 电影海报集
  pubDesc: '', //上映信息
  rt: '', //	电影上映时间
  sc: 0,
  scm: '',
  snum: 0, // 评分人数
  src: '', // 地区
  star: '', // 主演
  vd: '', // 预告片 url
  videoImg: '', // 预告片封面
  videourl: '',
  watched: 0,
  wish: 0,
  movieCelebs: [],
  movieComments: { cmts: [], hcmts: [] },
  relatedMovies: [],
  videos: []
};

const Detail: FC = () => {
  let { id } = useParams<IMovieDetailParams>();
  // 电影详情
  const [movieDetail, setMovieDetail] = useState<dataTypes.IMovieInfo>(
    defaultMovieDetail
  );

  const handleBtnClick = async () => {
    const { detailMovie } = await getMovieDetail(id);
    detailMovie.movieCelebs = await (await getMovieCeleb(id)).data.relations;
    detailMovie.movieComments = await getMovieComments(id);
    detailMovie.videos = await (await getMovieVideos(id)).vlist;
    detailMovie.relatedMovies = await (await getRelatedMovies(id)).data[0]
      .items;
    setMovieDetail(detailMovie);
  };

  return (
    <div className="detail">
      {/* TODO 按钮改成 useEffect */}
      <Button onClick={handleBtnClick}>DETAILS</Button>
      {/* 详情页上半部分，包括电影的基本信息如中英文名、评分等 */}
      <DetailTop movieDetail={movieDetail}></DetailTop>
      {/* 详情页下半部分，包括电影基本剧情、演员表等 */}
      <DetailBTM
        movieDetail={movieDetail}
        movieCelebs={movieDetail.movieCelebs}
        movieComments={movieDetail.movieComments}
        videos={movieDetail.videos}
        relatedMovies={movieDetail.relatedMovies}
      ></DetailBTM>
    </div>
  );
};

export default Detail;
