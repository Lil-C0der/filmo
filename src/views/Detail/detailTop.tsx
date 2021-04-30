import React, { FC } from 'react';
import { imgUrlParser, numberParser } from '@utils/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'woo-ui-react';
import { IMovieInfo } from '@/types';

import styles from './_style.module.scss';

interface IDetailUpperProps {
  movieDetail: IMovieInfo;
}

const DetailTop: FC<IDetailUpperProps> = ({ movieDetail }) => {
  return (
    <div className={styles.movieDetail_top}>
      <img
        className={styles.movieDetail_top_pic}
        src={imgUrlParser(movieDetail.img, 240, 330)}
        alt=""
      />
      <div className={styles.movieDetail_info}>
        <h1 className={styles.movieDetail_title}>{movieDetail.nm}</h1>
        <p className={styles.movieDetail_title_en}>{movieDetail.enm}</p>
        <p className={styles.movieDetail_director}>导演 {movieDetail.dir}</p>
        <p className={styles.movieDetail_brief}>
          {`${movieDetail.src} - 片长 ${movieDetail.dur} 分钟 - ${movieDetail.oriLang}`}
        </p>
        <p className={styles.movieDetail_pubDesc}>{movieDetail.pubDesc}</p>
        <div className={styles.movieDetail_action}>
          <div className={styles.btns}>
            {/* TODO 通过 movieDetail.id 实现看过和收藏功能 */}
            <Button btnType="danger" className={styles.btn} size="lg">
              看过
              <FontAwesomeIcon icon={['far', 'eye']}></FontAwesomeIcon>
            </Button>
            <Button btnType="danger" className={styles.btn} size="lg">
              收藏
              <FontAwesomeIcon icon={['far', 'heart']}></FontAwesomeIcon>
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.movieDetail_rate}>
        <div className={styles.rate_sc}>
          {movieDetail.sc ? `${movieDetail.sc} 分` : '暂无评分'}
        </div>
        <div className={styles.rate_num}>
          {numberParser(movieDetail.snum, 10000)} 万人评分
        </div>
        {/* 电影评分分布情况 */}
        <ul className={styles.rate_dist}>
          {movieDetail.distributions.map(({ movieScoreLevel, proportion }) => (
            <li className={styles.rate_dist_item} key={movieScoreLevel}>
              <span className={styles.level}>{movieScoreLevel}</span>
              <span
                className={styles.bar}
                style={{ width: `${proportion}px` }}
              ></span>
              <span className={styles.proportion}>{proportion}%</span>
            </li>
          ))}
        </ul>
        {movieDetail.scm ? (
          <h2 className={styles.rate_desc}>“{movieDetail.scm}“</h2>
        ) : null}
        <div className={styles.rate_tags}>
          {movieDetail.cat &&
            movieDetail.cat.split(',').map((cat, i) => (
              <span className={styles.cat_tag} key={i}>
                {cat}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailTop;
