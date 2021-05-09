import { ISearchMovieItem } from '@/types';
import { imgUrlParser } from '@/utils';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './_styles.module.scss';

const MovieItem: FC<ISearchMovieItem> = (props) => {
  const renderCateEl = () =>
    props.cat?.split(',').map((cate) => (
      <span key={cate} className={styles['movie-cateItem']}>
        {cate}
      </span>
    ));

  const renderCastEl = () =>
    props.star?.split(',').map((cast) => (
      <span key={cast} className={styles['movie-castItem']}>
        {cast}
      </span>
    ));

  return (
    <li key={props.id} className={styles['movie-item']}>
      <div className={styles['movie-pic']}>
        <img src={imgUrlParser(props.img, 160, 220)} alt="" />
      </div>
      <div className={styles['movie-info']}>
        <div className={styles['movie-name']}>
          <Link to={`/detail/${props.id}`}>{props.nm}</Link>
        </div>
        <div className={styles['movie-enm']}>{props.enm}</div>
        <div className={styles['movie-cate']}>{renderCateEl()}</div>
        <div className={styles['movie-date']}>{props.rt}</div>
        <div className={styles['movie-cast']}>{renderCastEl()}</div>
        <div className={styles['movie-rate']}>{props.sc} 分</div>
      </div>
    </li>
  );
};

export default MovieItem;
