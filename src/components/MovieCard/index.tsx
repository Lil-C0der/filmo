import React, { FC } from 'react';
import { imgUrlParser } from '@/utils';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './_style.module.scss';

interface IMovieCardProps {
  width?: string;
  height?: string;
  imgWidth: number;
  imgHeight: number;
  movieItem: IMovieCardInfo;
  isComingMovie: boolean;
  className?: string;
}

interface IMovieCardInfo {
  boxInfo?: string; // 票房信息
  id: number; // 电影编号
  // 电影图片的URL地址，
  // 请将图片地址中的”w.h”更改为”128.180”
  // “128.180”是图片的大小
  img: string;
  nm: string; // 电影名称
  fra: string; // 地区
  rt: string; //	上映时间
  sc: number | string; // 电影评分
  wish: number;
  star?: string; // 电影演员明星
}

const MovieCard: FC<IMovieCardProps> = ({
  movieItem,
  isComingMovie,
  className,
  width,
  height,
  imgWidth,
  imgHeight
}) => {
  const classes = classnames(className, styles.movieCard);

  return (
    <li className={classes} style={{ width, height }}>
      <img
        className={styles.movieCard_img}
        // 需要将接口返回 url 中的字段替换为图片的宽和高
        src={imgUrlParser(movieItem.img, imgWidth, imgHeight)}
        alt=""
      />

      <span className={styles.movieCard_info}>
        <p className={styles.movieCard_title}>{movieItem.nm}</p>
        {isComingMovie ? null : (
          <p className={styles.movieCard_rate}>
            {movieItem.sc > 0 ? movieItem.sc : '暂无评分'}
          </p>
        )}
      </span>
      {/* hover 时显示的 detail 卡片部分 */}
      <div className={styles.movieCard_detail}>
        <p className={styles.movieCard_detail_title}>
          <Link to={`/detail/${movieItem.id}`}>{movieItem.nm}</Link>
        </p>
        <p className={styles.movieCard_detail_date}>{movieItem.rt} 上映</p>
        <p>{movieItem.boxInfo}</p>
        <p className={styles.movieCard_detail_starring}>
          主演：{movieItem.star?.replaceAll(',', ' / ')}
        </p>
        <p className={styles.movieCard_detail_wish}>{movieItem.wish} 人想看</p>
        {movieItem.sc > 0 && !isComingMovie ? (
          <i className={styles.movieCard_detail_rate}>{movieItem.sc}</i>
        ) : null}
      </div>
    </li>
  );
};

export default MovieCard;
