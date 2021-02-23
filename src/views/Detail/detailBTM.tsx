import React, { FC, ReactNode, useRef } from 'react';
import { imgTransformer } from '@utils/index';
import Slide from '@cpnt/Slide';
import { Tabs } from 'woo-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IDetailTabsProps {
  movieDetail: dataTypes.IMovieInfo | null;
  movieCelebs: Array<dataTypes.IMovieCeleb> | null;
  movieComments: dataTypes.commentResponseData | null;
}

const DetailBTM: FC<IDetailTabsProps> = ({
  movieDetail,
  movieCelebs,
  movieComments
}) => {
  const cmtsArr = movieComments?.cmts;
  const hcmtsArr = movieComments?.hcmts;

  const briefEl = (
    <div className="movieDetail_sum">
      <p className="movieDetail_sum_title">剧情简介</p>
      <p className="movieDetail_sum_story">{movieDetail?.dra}</p>

      <p className="movieDetail_sum_title">影视原声</p>
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

      <p className="movieDetail_sum_title">热门影评 ({hcmtsArr?.length} 条)</p>
      <ul className="movieDetail_sum_hotComments">
        {hcmtsArr?.map((comment) => {
          return (
            <li className="comment_wrapper" key={comment.id}>
              <img src={comment.avatarurl} className="comment_avatar" alt="" />
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
                <li className="cast_item" key={celeb.id}>
                  <div className="cast_pic_wrapper">
                    <img
                      className="cast_pic"
                      src={imgTransformer(celeb.avatar, 128, 170)}
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
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );

  return (
    <Tabs activeIndex="1" className="movieDetail_bottom">
      <Tabs.Item index="1" name={'简介'}>
        {briefEl}
      </Tabs.Item>

      <Tabs.Item index="2" name={'演职员'}>
        ACTORS
        {castEl}
      </Tabs.Item>

      <Tabs.Item index="3" name={'奖项'} disabled>
        AWARDS
      </Tabs.Item>

      <Tabs.Item index="4" name={'剧照'} className="gallery">
        <Slide className="gallery_slide" height="500px" interval={5000}>
          {movieDetail?.photos.map((url, i) => (
            <Slide.Item index={i} key={i}>
              <div className="gallery_pic_wrapper">
                <img
                  className="gallery_pic"
                  key={i}
                  src={imgTransformer(url, 720, 450)}
                  alt=""
                />
              </div>
            </Slide.Item>
          ))}
        </Slide>
      </Tabs.Item>
    </Tabs>
  );
};

export default DetailBTM;
