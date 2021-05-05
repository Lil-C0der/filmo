import React, { FC, useCallback, useState } from 'react';
import { imgUrlParser, numberParser } from '@utils/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'woo-ui-react';
import { IMovieInfo, IMovieOfUser } from '@/types';

import styles from './_style.module.scss';
import { addToCollection } from '@/network/users';
import { observer, useLocalStore } from 'mobx-react-lite';
import store from '@/store';
import Alert, { IAlertProps } from 'woo-ui-react/dist/components/Alert/alert';
import { toJS } from 'mobx';

interface IDetailUpperProps {
  movieDetail: IMovieInfo;
}

enum MOVIE_ALERT_MSG {
  UNAUTH = '请先登录！'
}

enum ListSource {
  collectionList = 1,
  watchedList = 2
}

const DetailTop: FC<IDetailUpperProps> = observer(({ movieDetail }) => {
  const userModel = useLocalStore(() => store);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConf, setAlertConf] = useState<IAlertProps>({
    title: '',
    description: '',
    type: 'primary'
  });

  const isCollected = useCallback(() => {
    console.log('collection', toJS(userModel.user.collectionList));

    return toJS(userModel.user.collectionList)
      .map((m) => m.id)
      .includes(movieDetail.id);
  }, [movieDetail.id, userModel.user.collectionList]);

  const onWatchBtnClick = () => {
    console.log('watched');
  };

  const removeMovie = useCallback((source: ListSource) => {
    if (source === ListSource.collectionList) {
      console.log('remove from collection list');
    } else {
    }
  }, []);

  const onCollectBtnClick = async () => {
    if (!userModel.isLogin) {
      setAlertConf({
        title: MOVIE_ALERT_MSG.UNAUTH,
        type: 'danger'
      });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1000);
      return;
    }

    if (movieDetail.id && movieDetail.nm) {
      if (isCollected()) {
        removeMovie(ListSource.collectionList);
        return;
      }
      const {
        id,
        nm,
        enm,
        img: imgUrl,
        rt,
        star,
        src: fra,
        sc,
        wish
      } = movieDetail;
      const movieDto: IMovieOfUser = {
        id,
        nm,
        enm,
        imgUrl,
        rt,
        fra,
        star,
        sc,
        wish
      };
      try {
        const { msg, code } = await addToCollection(movieDto);
        if (code === 200) {
          setAlertConf({
            title: msg,
            type: 'success'
          });
        }
        userModel.addToCollection(movieDto);
      } catch (error) {
        setAlertConf({
          title: MOVIE_ALERT_MSG.UNAUTH,
          type: 'danger'
        });
      }

      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1000);
    }
  };

  let alertEl = alertVisible ? (
    <Alert
      closable
      className={styles['movieDetail-alert']}
      title={alertConf.title}
      description={alertConf.description}
      type={alertConf.type}
      onClose={() => {
        alertEl = null;
        setTimeout(() => {
          setAlertVisible(false);
        }, 300);
      }}
    />
  ) : null;

  return (
    <div className={styles.movieDetail_top}>
      {alertEl}
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
            <Button
              btnType="danger"
              className={styles.btn}
              size="lg"
              onClick={onWatchBtnClick}
            >
              看过
              <FontAwesomeIcon icon={['far', 'eye']}></FontAwesomeIcon>
            </Button>
            <Button
              btnType="danger"
              className={styles.btn}
              size="lg"
              onClick={onCollectBtnClick}
            >
              收藏
              {isCollected() + ''}
              <FontAwesomeIcon
                icon={isCollected() ? 'heart' : ['far', 'heart']}
              />
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
});

export default DetailTop;
