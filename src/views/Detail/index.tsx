import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '@network/movie';
import { imgTransformer } from '@utils/index';

import './_style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div>
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
        <div className="movieDetail_hd_infoWrapper">
          <h1 className="movieDetail_hd_title">{movieDetail?.nm}</h1>
          <p className="movieDetail_hd_title_en">{movieDetail?.enm}</p>
          <p className="movieDetail_hd_director">导演 {movieDetail?.dir}</p>
          <p className="movieDetail_hd_brief">
            {movieDetail?.src} - 片长 {movieDetail?.dur} 分钟
          </p>
          <p className="movieDetail_hd_pubDesc">{movieDetail?.pubDesc}</p>
          <div className="movieDetail_hd_action">
            <div className="btn">
              收藏
              <FontAwesomeIcon icon={['far', 'heart']}></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
