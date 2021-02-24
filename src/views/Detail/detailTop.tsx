import React, { FC } from 'react';
import { imgTransformer, numberTransformer } from '@utils/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'woo-ui-react';

interface IDetailUpperProps {
  movieDetail: dataTypes.IMovieInfo | null;
}

const DetailTop: FC<IDetailUpperProps> = ({ movieDetail }) => {
  return (
    <div className="movieDetail_top">
      <img
        className="movieDetail_top_pic"
        src={imgTransformer(movieDetail?.img, 240, 330)}
        alt=""
      />
      <div className="movieDetail_info">
        <h1 className="movieDetail_title">{movieDetail?.nm}</h1>
        <p className="movieDetail_title_en">{movieDetail?.enm}</p>
        <p className="movieDetail_director">导演 {movieDetail?.dir}</p>
        <p className="movieDetail_brief">
          {movieDetail?.src} - 片长 {movieDetail?.dur} 分钟
        </p>
        <p className="movieDetail_pubDesc">{movieDetail?.pubDesc}</p>
        <div className="movieDetail_action">
          <div className="btns">
            {/* TODO 通过 movieDetail.id 实现看过和收藏功能 */}
            <Button btnType="danger" className="btn" size="lg">
              看过
              <FontAwesomeIcon icon={['far', 'eye']}></FontAwesomeIcon>
            </Button>
            <Button btnType="danger" className="btn" size="lg">
              收藏
              <FontAwesomeIcon icon={['far', 'heart']}></FontAwesomeIcon>
            </Button>
          </div>
        </div>
      </div>

      <div className="movieDetail_rate">
        <div className="rate_sc">
          {movieDetail?.sc ? `${movieDetail?.sc} 分` : '暂无评分'}
        </div>
        <div className="rate_num">
          {numberTransformer(movieDetail?.snum, 10000)} 万人评分
        </div>
        {/* 电影评分分布情况 */}
        <ul className="rate_dist">
          {movieDetail?.distributions.map(({ movieScoreLevel, proportion }) => (
            <li className="rate_dist_item" key={movieScoreLevel}>
              <span className="level">{movieScoreLevel}</span>
              <span className="bar" style={{ width: `${proportion}px` }}></span>
              <span className="proportion">{proportion}%</span>
            </li>
          ))}
        </ul>
        <h2 className="rate_desc">“{movieDetail?.scm}“</h2>
      </div>
    </div>
  );
};

export default DetailTop;
