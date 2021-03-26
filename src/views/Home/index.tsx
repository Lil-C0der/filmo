import React, { FC, useState, useEffect, useCallback } from 'react';
import MovieListItem from './movieListItem';
import Slide from '@cpnt/Slide';
import { getHotMovies, getCommingMovie } from '@network/movie';
import './_style.scss';

interface hotAndCommingMovieList {
  hot: Array<dataTypes.IMovieListObj>;
  coming: Array<dataTypes.IMovieListObj>;
}
const defaultMovieListObj: hotAndCommingMovieList = {
  hot: [],
  coming: []
};

const Home: FC = () => {
  const [movieListObj, setMovieListObj] = useState(defaultMovieListObj);
  const [slideActiveIdx, setSlideActiveIdx] = useState<number>(1);
  const [slideActiveIdx2, setSlideActiveIdx2] = useState<number>(1);

  const initMovieList = useCallback(async () => {
    const { hot } = await (await getHotMovies()).data;
    const { coming } = await (await getCommingMovie()).data;

    setMovieListObj({ hot, coming });
  }, []);

  useEffect(() => {
    initMovieList();
  }, [initMovieList]);

  /**
   * 根据 list 渲染对应元素，返回结果是多个 SlideItem 组件
   * @param {*} props
   * @return {Array<JSX.Element>}
   */
  const renderSlideItem: (
    movieList: dataTypes.IMovieListObj[],
    isComingMovieList: boolean
  ) => Array<JSX.Element> = (movieList, isComingMovieList) => {
    let slideItemArr: Array<JSX.Element> = [];

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

  return (
    <div className="homepage">
      <div className="movies_title hotMovies_title">
        正在热映
        <span className="hotMovies_slide_indicator">
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
        <span className="hotMovies_slide_indicator">
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
  );
};

export default Home;
