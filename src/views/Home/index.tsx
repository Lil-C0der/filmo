import React, { FC, useState, useEffect, useRef } from 'react';
import MovieListItem from './movieListItem';
// import Slide from '@cpnt/Slide';
// import SlideItem from '@/components/Slide/slideItem';

import Slide from '@cpnt/Slide';
import { getHotMovies, getCommingMovie } from '@network/movie';

import './_style.scss';

const Home: FC = (props) => {
  const [movieList, setMovieList] = useState<Array<dataTypes.IMovieListObj>>(
    []
  );
  const [slideActiveIdx, setSlideActiveIdx] = useState<number>(1);

  useEffect(() => {
    getHotMovies().then((res: dataTypes.hotMoviesResponseData) => {
      setMovieList(res.movieList);
    });
  }, []);

  /**
   * 根据 movieList 渲染对应元素，返回结果是多个 SlideItem 组件
   * @param {*} props
   * @return {Array<JSX.Element>}
   */
  const renderSlideItem: () => Array<JSX.Element> = () => {
    let slideItemArr: Array<JSX.Element> = [];

    for (let startIdx = 0; startIdx < movieList.length; startIdx += 4) {
      slideItemArr.push(
        <Slide.Item index={startIdx / 4} key={startIdx}>
          <ul className="hotMovies_list">
            {movieList.slice(startIdx, startIdx + 4).map((movieObj) => (
              <MovieListItem movieObj={movieObj} key={movieObj.id} />
            ))}
          </ul>
        </Slide.Item>
      );
    }

    return slideItemArr;
  };

  return (
    <div className="homepage">
      <div className="hotMovies_title">
        正在热映
        <span className="hotMovies_slide_indicator">
          {slideActiveIdx} / {movieList.length / 4}
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
        {renderSlideItem()}
      </Slide>
    </div>
  );
};

export default Home;
