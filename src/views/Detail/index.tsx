import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '@network/movie';
import { imgTransformer, numberTransformer } from '@utils/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RateDist from './rateDist';
import './_style.scss';

interface IParams {
  id: string;
}

const Detail: FC = (props) => {
  let { id } = useParams<IParams>();
  const [movieDetail, setMovieDetail] = useState<dataTypes.IMovieInfo | null>(
    null
  );

  const handleBtnClick = () => {
    getMovieDetail(id).then(({ detailMovie }) => {
      console.log(detailMovie);
      setMovieDetail(detailMovie);
    });
  };

  return (
    <div className="detail">
      "DETAIL"
      <p>{id}</p>
      <div className="btn" onClick={handleBtnClick}>
        DETAILS
      </div>
      <div className="movieDetail_hd">
        <img
          className="movieDetail_hd_pic"
          src={imgTransformer(movieDetail?.img, 240, 330)}
          alt=""
        />

        <div className="movieDetail_hd_info">
          <h1 className="movieDetail_hd_title">{movieDetail?.nm}</h1>
          <p className="movieDetail_hd_title_en">{movieDetail?.enm}</p>
          <p className="movieDetail_hd_director">导演 {movieDetail?.dir}</p>
          <p className="movieDetail_hd_brief">
            {movieDetail?.src} - 片长 {movieDetail?.dur} 分钟
          </p>
          <p className="movieDetail_hd_pubDesc">{movieDetail?.pubDesc}</p>
          <div className="movieDetail_hd_action">
            <div className="btns">
              <div className="btn_red">
                看过
                <FontAwesomeIcon icon={['far', 'eye']}></FontAwesomeIcon>
              </div>
              <div className="btn_red">
                收藏
                <FontAwesomeIcon icon={['far', 'heart']}></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </div>

        <div className="movieDetail_hd_rate">
          <div className="rate_sc">
            {movieDetail?.sc ? `${movieDetail?.sc} 分` : '暂无评分'}
          </div>
          <div className="rate_num">
            {numberTransformer(movieDetail?.snum, 10000)} 万人评分
          </div>
          <RateDist distArr={movieDetail?.distributions}></RateDist>
          <h3 className="rate_desc">“{movieDetail?.scm}“</h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
