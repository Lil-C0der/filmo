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

interface IParams {
  id: string;
}

const Detail: FC = (props) => {
  let { id } = useParams<IParams>();
  // 电影详情
  const [movieDetail, setMovieDetail] = useState<dataTypes.IMovieInfo | null>(
    null
  );
  // 电影演职人员
  const [
    movieCelebs,
    setMovieCelebs
  ] = useState<Array<dataTypes.IMovieCeleb> | null>(null);
  // 电影评论，包括热评和最新评论
  const [
    movieCommentsObj,
    setMovieCommentsObj
  ] = useState<dataTypes.commentResponseData | null>(null);
  // 相关视频，预告片等
  const [videos, setVideos] = useState<Array<dataTypes.IVideoInfo> | null>(
    null
  );
  // 相关的电影
  const [
    relatedMovies,
    setRelatedMovies
  ] = useState<Array<dataTypes.IRelatedMovie> | null>(null);

  const handleBtnClick = () => {
    getMovieDetail(id).then(({ detailMovie }) => {
      console.log(detailMovie);
      setMovieDetail(detailMovie);
    });
  };

  const handleCelebBtnClick = () => {
    getMovieCeleb(id).then(({ data }) => {
      console.log(data.relations);
      setMovieCelebs(data.relations);
    });
  };

  const handleCommentBtnClick = () => {
    getMovieComments(id).then((res) => {
      console.log(res);
      setMovieCommentsObj(res);
    });
  };

  const handleVideoBtnClick = () => {
    getMovieVideos(id).then((res) => {
      console.log(res);
      setVideos(res.vlist.slice(0, 5));
    });
  };

  const handleRelatedMovieBtnClick = () => {
    getRelatedMovies(id).then((res) => {
      console.log(res.data[0].items);
      setRelatedMovies(res.data[0].items.slice(0, 18));
    });
  };

  return (
    <div className="detail">
      {/* TODO 按钮改成 useEffect */}
      <Button onClick={handleBtnClick}>DETAILS</Button>
      <Button onClick={handleCelebBtnClick}>CELEBS</Button>
      <Button onClick={handleCommentBtnClick}>COMMENTS</Button>
      <Button onClick={handleRelatedMovieBtnClick}>RELATED MOVIE</Button>
      <Button onClick={handleVideoBtnClick}>VIDEO</Button>
      {/* 详情页上半部分，包括电影的基本信息如中英文名、评分等 */}
      <DetailTop movieDetail={movieDetail}></DetailTop>
      {/* 详情页下半部分，包括电影基本剧情、演员表等 */}
      <DetailBTM
        movieDetail={movieDetail}
        movieCelebs={movieCelebs}
        movieComments={movieCommentsObj}
        videos={videos}
        relatedMovies={relatedMovies}
      ></DetailBTM>
    </div>
  );
};

export default Detail;
