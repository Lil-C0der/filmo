import React, { FC, useState, useEffect, useCallback } from 'react';
import MovieListItem from './movieListItem';
import Slide from '@cpnt/Slide';
import { getHotMovies, getCommingMovie } from '@network/movie';
import { getEntNews, getMoviesNews } from '@network/news';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMovieListObj, INewsItem, IPost } from '@/types';
import { getPostsList } from '@/network/post';
import { Link } from 'react-router-dom';

import styles from './_style.module.scss';

interface IHotAndCommingMovieList {
  hot: Array<IMovieListObj>;
  coming: Array<IMovieListObj>;
}
interface INewsList {
  entNews: INewsItem[];
  moviesNews: INewsItem[];
}
const defaultMovieListObj: IHotAndCommingMovieList = {
  hot: [],
  coming: []
};
const defaultNewsListObj: INewsList = {
  entNews: [],
  moviesNews: []
};

const Home: FC = () => {
  const [movieListObj, setMovieListObj] = useState(defaultMovieListObj);
  const [newsListObj, setNewsListObj] = useState(defaultNewsListObj);
  const [slideActiveIdx, setSlideActiveIdx] = useState<number>(1);
  const [slideActiveIdx2, setSlideActiveIdx2] = useState<number>(1);
  const [postList, setPostList] = useState<IPost[]>([]);

  const fetchPosts = useCallback(async () => {
    const { data } = await getPostsList();
    setPostList(data.posts);
  }, []);

  const initMovieList = useCallback(async () => {
    const { hot } = await (await getHotMovies()).data;
    const { coming } = await (await getCommingMovie()).data;

    setMovieListObj({ hot, coming });
  }, []);

  const initNewsList = useCallback(async () => {
    const entNews = await (await getEntNews(5)).newslist;
    const moviesNews = await (await getMoviesNews(5)).newslist;
    setNewsListObj({ entNews, moviesNews });
  }, []);

  useEffect(() => {
    initMovieList();
    initNewsList();
    fetchPosts();
  }, [fetchPosts, initMovieList, initNewsList]);

  /**
   * 根据 list 渲染对应元素，返回结果是多个 SlideItem 组件
   * @param {dataTypes.IMovieListObj[]} movieList
   * @param {boolean} isComingMovieList
   * @return {JSX.Element[]}
   */
  const renderSlideItem: (
    movieList: IMovieListObj[],
    isComingMovieList: boolean
  ) => JSX.Element[] = (movieList, isComingMovieList) => {
    let slideItemArr: JSX.Element[] = [];

    for (let startIdx = 0; startIdx < movieList.length; startIdx += 4) {
      slideItemArr.push(
        <Slide.Item index={startIdx / 4} key={startIdx}>
          <ul className={styles.hotMovies_list}>
            {movieList.slice(startIdx, startIdx + 4).map((movieItem) => (
              <MovieListItem
                movieItem={movieItem}
                isComingMovie={isComingMovieList}
                key={movieItem.id}
              />
            ))}
          </ul>
        </Slide.Item>
      );
    }

    return slideItemArr;
  };

  /**
   * 根据 newsList 返回多个 newsList_item
   * @param {dataTypes.INewsItem[]} newsList
   * @return {JSX.Element[]}
   */
  const renderNewsList = (newsList: INewsItem[], isMoviesNewsList = true) =>
    newsList.map((newsItem) => (
      <li
        key={newsItem.id}
        className={
          isMoviesNewsList
            ? styles.newsList_item
            : `${styles.newsList_item} ${styles.newsList_item_ent}`
        }
      >
        <div className={styles.newsList_item_picWrapper}>
          <img src={newsItem.picUrl} alt="" />
        </div>
        <div className={styles.newsList_item_wrapper}>
          <a
            className={styles.newsList_item_title}
            href={newsItem.url}
            target="__blank"
          >
            {newsItem.title}
          </a>
          <p className={styles.newsList_item_time}>{newsItem.ctime}</p>
          <p className={styles.newsList_item_source}>{newsItem.source}</p>
        </div>
      </li>
    ));

  return (
    <div className={styles.homepage}>
      <div className={styles.homepage_movies}>
        <div className={`${styles.movies_title} ${styles.hotMovies_title}`}>
          正在热映
          <span className={styles.movies_slide_indicator}>
            {slideActiveIdx} / {movieListObj.hot.length / 4}
          </span>
        </div>
        <Slide
          className={styles.hotMovies_slide}
          interval={5000}
          height="220px"
          onChange={(currIdx) => {
            setSlideActiveIdx(currIdx + 1);
            return;
          }}
        >
          {renderSlideItem(movieListObj.hot, false)}
        </Slide>

        <div className={`${styles.movies_title} ${styles.comingMovies_title}`}>
          即将上映
          <span className={styles.movies_slide_indicator}>
            {slideActiveIdx2} / {movieListObj.coming.length / 4}
          </span>
        </div>
        <Slide
          className={styles.hotMovies_slide}
          interval={5000}
          height="220px"
          onChange={(currIdx) => {
            setSlideActiveIdx2(currIdx + 1);
            return;
          }}
        >
          {renderSlideItem(movieListObj.coming, true)}
        </Slide>

        <div className={styles.homepage_posts}>
          <div className={styles.movies_title}>社区热帖</div>
          <ul>
            {postList.reverse().map((p) => (
              <li key={p.id} className={styles['post-wrapper']}>
                <Link to={`post/${p.id}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.homepage_news}>
        <ul className={styles.newsList}>
          <div className={styles.newsList_title_wrapper}>
            <h4 className={styles.newsList_title}>影视新闻</h4>
            <a href="/news/movie" className={styles.newsList_title_more}>
              更多&nbsp;
              <FontAwesomeIcon className={styles.icon} icon="caret-right" />
            </a>
          </div>
          {renderNewsList(newsListObj.moviesNews)}
          <div className={styles.newsList_title_wrapper}>
            <h4 className={styles.newsList_title}>娱乐新闻</h4>
            <a href="/news/ent" className={styles.newsList_title_more}>
              更多&nbsp;
              <FontAwesomeIcon className={styles.icon} icon="caret-right" />
            </a>
          </div>
          {renderNewsList(newsListObj.entNews, false)}
        </ul>
      </div>
    </div>
  );
};

export default Home;
