import { ISearchMovieItem } from '@/types';
import { imgUrlParser } from '@/utils';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const MovieItem: FC<ISearchMovieItem> = (props) => {
  const renderCateEl = () =>
    props.cat?.split(',').map((cate) => (
      <span key={cate} className="movie-cateItem">
        {cate}
      </span>
    ));

  const renderCastEl = () =>
    props.star?.split(',').map((cast) => (
      <span key={cast} className="movie-castItem">
        {cast}
      </span>
    ));

  return (
    <li key={props.id} className="movie-item">
      <div className="movie-pic">
        <img src={imgUrlParser(props.img, 160, 220)} alt="" />
      </div>
      <div className="movie-info">
        <div className="movie-name">
          <Link to={`/detail/${props.id}`}>{props.nm}</Link>
        </div>
        <div className="movie-enm">{props.enm}</div>
        <div className="movie-cate">{renderCateEl()}</div>
        <div className="movie-date">{props.rt}</div>
        <div className="movie-cast">{renderCastEl()}</div>
        <div className="movie-rate">{props.sc} 分</div>
      </div>
    </li>
  );
};

export default MovieItem;
