import React, { FC } from 'react';
import { imgUrlParser } from '@/utils';
import { Link } from 'react-router-dom';
import { IMovieListObj } from '@/types';

import styles from './_style.module.scss';

interface IMovieListItemProps {
  movieItem: IMovieListObj;
  isComingMovie: boolean;
}

const movieListItem: FC<IMovieListItemProps> = ({
  movieItem,
  isComingMovie
}) => {
  return (
    <li className={styles.movieList_item}>
      <img
        className={styles.movieList_item_img}
        // 需要将接口返回 url 中的字段替换为图片的宽和高
        src={imgUrlParser(movieItem.img, 160, 220)}
        alt=""
      />

      <span className={styles.movieList_item_info}>
        <p className={styles.movieList_item_title}>{movieItem.nm}</p>
        {isComingMovie ? null : (
          <p className={styles.movieList_item_rate}>
            {movieItem.sc ? movieItem.sc : '暂无评分'}
          </p>
        )}
      </span>
      {/* hover 时显示的 detail 卡片部分 */}
      <div className={styles.movieList_item_detail}>
        <p className={styles.movieList_item_detail_title}>
          <Link to={`/detail/${movieItem.id}`}>{movieItem.nm}</Link>
        </p>
        <p className={styles.movieList_item_detail_date}>{movieItem.rt} 上映</p>
        <p>{movieItem.boxInfo}</p>
        <p className={styles.movieList_item_detail_starring}>
          主演：{movieItem.star?.replaceAll(',', ' / ')}
        </p>
        <p className={styles.movieList_item_detail_wish}>
          {movieItem.wish} 人想看
        </p>
        {movieItem.sc && !isComingMovie ? (
          <i className={styles.movieList_item_detail_rate}>{movieItem.sc}</i>
        ) : null}
      </div>
    </li>
  );
};

export default movieListItem;
