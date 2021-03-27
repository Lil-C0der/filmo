import React, { FC, useState, useEffect, useCallback } from 'react';
import MovieListItem from './movieListItem';
import Slide from '@cpnt/Slide';
import { getHotMovies, getCommingMovie } from '@network/movie';
import { getEntNews, getMoviesNews } from '@network/news';
import './_style.scss';

interface IHotAndCommingMovieList {
  hot: Array<dataTypes.IMovieListObj>;
  coming: Array<dataTypes.IMovieListObj>;
}
interface INewsList {
  entNews: dataTypes.INewsItem[];
  moviesNews: dataTypes.INewsItem[];
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
  }, [initMovieList, initNewsList]);

  /**
   * 根据 list 渲染对应元素，返回结果是多个 SlideItem 组件
   * @param {dataTypes.IMovieListObj[]} movieList
   * @param {boolean} isComingMovieList
   * @return {JSX.Element[]}
   */
  const renderSlideItem: (
    movieList: dataTypes.IMovieListObj[],
    isComingMovieList: boolean
  ) => JSX.Element[] = (movieList, isComingMovieList) => {
    let slideItemArr: JSX.Element[] = [];

    for (let startIdx = 0; startIdx < movieList.length; startIdx += 4) {
      slideItemArr.push(
        <Slide.Item index={startIdx / 4} key={startIdx}>
          <ul className="hotMovies_list">
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
  const renderNewsList = (
    newsList: dataTypes.INewsItem[],
    isMoviesNewsList = true
  ) =>
    newsList.map((newsItem) => (
      <li
        key={newsItem.id}
        className={`${
          isMoviesNewsList ? 'newsList_item' : 'newsList_item newsList_item_ent'
        }`}
      >
        <div className="newsList_item_picWrapper">
          <img src={newsItem.picUrl} alt="" />
        </div>
        <div className="newsList_item_wrapper">
          <a
            className="newsList_item_title"
            href={newsItem.url}
            target="__blank"
          >
            {newsItem.title}
          </a>
          <p className="newsList_item_time">{newsItem.ctime}</p>
          <p className="newsList_item_source">{newsItem.source}</p>
        </div>
      </li>
    ));

  return (
    <div className="homepage">
      <div className="homepage_movies">
        <div className="movies_title hotMovies_title">
          正在热映
          <span className="movies_slide_indicator">
            {slideActiveIdx} / {movieListObj.hot.length / 4}
          </span>
        </div>
        <Slide
          className="hotMovies_slide"
          interval={5000}
          height="220px"
          onChange={(currIdx) => {
            setSlideActiveIdx(currIdx + 1);
            return;
          }}
        >
          {renderSlideItem(movieListObj.hot, false)}
        </Slide>

        <div className="movies_title comingMovies_title">
          即将上映
          <span className="movies_slide_indicator">
            {slideActiveIdx2} / {movieListObj.coming.length / 4}
          </span>
        </div>
        <Slide
          className="hotMovies_slide"
          interval={5000}
          height="220px"
          onChange={(currIdx) => {
            setSlideActiveIdx2(currIdx + 1);
            return;
          }}
        >
          {renderSlideItem(movieListObj.coming, true)}
        </Slide>
      </div>

      <div className="homepage_news">
        <ul className="newsList">
          <h4 className="newsList_title">影视新闻</h4>
          {renderNewsList(newsListObj.moviesNews)}
          <h4 className="newsList_title">娱乐新闻</h4>
          {renderNewsList(newsListObj.entNews, false)}
        </ul>
      </div>
    </div>
  );
};

export default Home;
