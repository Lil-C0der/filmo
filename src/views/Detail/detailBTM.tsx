import React, { FC, useState } from 'react';
import { imgUrlParser, numberParser } from '@utils/index';
import Slide from '@cpnt/Slide';
import { Tabs } from 'woo-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Placeholder from '@/components/Placeholder';
import { IMovieCeleb, IMovieInfo, IRelatedMovie, IVideoInfo } from '@/types';

interface IDetailTabsProps {
  movieDetail: IMovieInfo | null;
  movieCelebs: Array<IMovieCeleb> | null;
  movieComments: dataTypes.commentResponseData | null;
  videos: Array<IVideoInfo> | null;
  relatedMovies: Array<IRelatedMovie> | null;
}

const DetailBTM: FC<IDetailTabsProps> = ({
  movieDetail,
  movieCelebs,
  movieComments,
  videos,
  relatedMovies
}) => {
  const cmtsArr = movieComments?.cmts;
  const hcmtsArr = movieComments?.hcmts;

  const [galleryIndex, setGalleryIndex] = useState(1);

  const setIframeHeight = (iframe: HTMLIFrameElement) => {
    if (iframe) {
      const iframeWin = iframe.contentWindow as Window;
      if (iframeWin.document.body) {
        iframe.height = String(
          (iframeWin.document.documentElement.scrollHeight ||
            iframeWin.document.body.scrollHeight) - 50
        );
        console.log(123, iframe.height);
      }
    }
  };

  window.onload = function () {
    const iFrameEl = document.getElementById('external-frame');
    console.log(iFrameEl);
    setIframeHeight(iFrameEl as HTMLIFrameElement);
  };

  const briefEl = (
    <div className="movieDetail_sum">
      <p className="movieDetail_sum_title">剧情简介</p>
      <p className="movieDetail_sum_story">{movieDetail?.dra}</p>

      <p className="movieDetail_sum_title">影视原声</p>
      {movieDetail?.musicName ? (
        <div className="movieDetail_sum_track">
          <img
            src="
        https://p0.meituan.net/scarlett/52ed06a649b14df78ebee02e9959c32911524.png@140w_140h_1e_1c"
            alt=""
          />
          <span className="movieDetail_sum_track_wrapper">
            <h3 className="movieDetail_sum_track_name">
              {movieDetail?.musicName}
            </h3>
            <h4>{movieDetail?.musicStar}</h4>
          </span>
        </div>
      ) : (
        <Placeholder />
      )}

      <p className="movieDetail_sum_title">热门影评 ({hcmtsArr?.length} 条)</p>
      {hcmtsArr?.length ? (
        <ul className="movieDetail_sum_hotComments">
          {hcmtsArr?.map((comment) => {
            return (
              <li className="comment_wrapper" key={comment.id}>
                <img
                  src={comment.avatarurl}
                  className="comment_avatar"
                  alt=""
                />
                <div className="comment_info">
                  <p className="comment_nick">
                    {comment.nickName}
                    <i className="comment_tag tag">lv.{comment.userLevel}</i>
                  </p>
                  <p className="comment_time">
                    {comment.time}
                    <i className="comment_city">{comment.cityName}</i>
                  </p>
                  <p className="comment_content">{comment.content}</p>
                </div>
                {/* 点赞按钮 */}
                {/* TODO 通过评论 id，实现点赞功能 */}
                <span className="comment_like">
                  <FontAwesomeIcon
                    className="comment_like_icon"
                    size="lg"
                    icon={['far', 'thumbs-up']}
                  />
                  {comment.approve}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <Placeholder />
      )}

      <p className="movieDetail_sum_title">最新影评 ({cmtsArr?.length} 条)</p>
      {cmtsArr?.length ? (
        <ul className="movieDetail_sum_newComments">
          {cmtsArr?.map((comment) => {
            return (
              <li className="comment_wrapper" key={comment.id}>
                <img
                  src={comment.avatarurl}
                  className="comment_avatar"
                  alt=""
                />
                <div className="comment_info">
                  <p className="comment_nick">
                    {comment.nickName}
                    <i className="comment_tag tag">lv.{comment.userLevel}</i>
                  </p>
                  <p className="comment_time">
                    {comment.time}
                    <i className="comment_city">{comment.cityName}</i>
                  </p>
                  <p className="comment_content">{comment.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <Placeholder />
      )}
      {/* TODO 本站评论 */}
    </div>
  );

  const castEl = (
    <div className="movieDetail_cast">
      {movieCelebs?.map((celebObj, i) => {
        const { title, count } = celebObj.titleCount;
        return (
          <div key={i}>
            <p className="cast_title">
              {title} <i className="cast_title_count">({count})</i>
            </p>
            <ul className="cast_list">
              {celebObj.celebrities.map((celeb) => (
                <Link to={`/cast/${celeb.id}`} key={celeb.id}>
                  <li className="cast_item" key={celeb.id}>
                    <div className="cast_pic_wrapper">
                      <img
                        className="cast_pic"
                        src={imgUrlParser(celeb.avatar, 128, 170)}
                        alt=""
                      />
                    </div>
                    <p className="cast_name">{celeb.cnm}</p>
                    {celeb.roles ? (
                      <p className="cast_role">饰：{celeb.roles}</p>
                    ) : (
                      ''
                    )}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );

  // 预告片等相关视频
  const videoEl = (
    <ul className="video_list">
      {videos?.map((video) => (
        <li className="video_item" key={video.id}>
          <div className="video_item_imgWrapper">
            <img src={imgUrlParser(video.img, 210, 119)} alt="" />
          </div>
          <div className="video_item_infoWrapper">
            <a
              className="video_item_title"
              rel="noreferrer"
              href={video.url}
              target="_blank"
            >
              {video.tl}
            </a>
            <p className="video_item_count">
              <FontAwesomeIcon icon="play-circle" />
              {numberParser(video.count, 10000)} 万播放
            </p>
          </div>
        </li>
      ))}
    </ul>
  );

  // 相关电影
  const relatedMoviesEl = (
    <ul className="relatedMovies_list">
      {relatedMovies?.map((movie) => (
        <li className="relatedMovies_item" key={movie.desc}>
          <div className="relatedMovies_item_imgWrapper">
            <img src={imgUrlParser(movie.img, 106, 145)} alt="" />
          </div>
          <Link
            to={`/detail/${movie.desc}`}
            target="_blank"
            className="relatedMovies_item_title"
          >
            {movie.title}
          </Link>
          <p className="relatedMovies_item_rate">
            {movie.sc ? movie.sc : '暂无评分'}
          </p>
        </li>
      ))}
    </ul>
  );

  const awardUrl = movieDetail?.awardUrl?.replace(
    'https://m.maoyan.com',
    // 'https://i.maoyan.com'
    'http://localhost:3000/api/iframe/apollo'
  );

  console.log(movieDetail?.awardUrl, awardUrl);
  return (
    <div className="movieDetail_bottom">
      <Tabs activeIndex="1" className="movieDetail_bottom_tab">
        <Tabs.Item index="1" name={'简介'}>
          {briefEl}
        </Tabs.Item>

        <Tabs.Item index="2" name={'演职员'}>
          {castEl}
        </Tabs.Item>

        <Tabs.Item index="3" name={'奖项'} disabled={!movieDetail?.awardUrl}>
          <iframe
            src={awardUrl}
            // src="http://localhost:3000/api/iframe/apollo/movie/243/honor?_v_=yes&utm_campaign=AmovieBmovieD100"
            title="award"
            style={{ width: '100%', overflowY: 'hidden' }}
            frameBorder="0"
            scrolling="no"
            id="external-frame"
            onLoad={(e) => {
              console.log();
              const frame = e.currentTarget;
              setIframeHeight(frame);
            }}
          ></iframe>
        </Tabs.Item>

        <Tabs.Item index="4" name={'剧照'} className="gallery">
          <p className="gallery_indicator">
            {galleryIndex} / {movieDetail?.photos.length}
          </p>

          <Slide
            className="gallery_slide"
            height="500px"
            interval={5000}
            onChange={(currIdx) => {
              setGalleryIndex(currIdx + 1);
              return;
            }}
          >
            {movieDetail?.photos.map((url, i) => (
              <Slide.Item index={i} key={i}>
                <div className="gallery_pic_wrapper">
                  <img
                    className="gallery_pic"
                    key={i}
                    src={imgUrlParser(url, 720, 450)}
                    alt=""
                  />
                </div>
              </Slide.Item>
            ))}
          </Slide>
        </Tabs.Item>
      </Tabs>

      <div className="movieDetail_bottom_more">
        <p className="video_title">预告片</p>
        {videoEl}
        <p className="relatedMovies_title">相关电影</p>
        {relatedMoviesEl}
      </div>
    </div>
  );
};

export default DetailBTM;
