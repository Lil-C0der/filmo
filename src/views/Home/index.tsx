import React, { FC, useState, useEffect, useRef } from 'react';
import Slide from '@cpnt/Slide';
import SlideItem from '@/components/Slide/slideItem';

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
        <SlideItem index={startIdx / 4} key={startIdx}>
          <ul className="hotMovies_list">
            {movieList.slice(startIdx, startIdx + 4).map((movieObj) => (
              <li className="movieList_item" key={movieObj.id}>
                <img
                  className="movieList_item_img"
                  // 需要将接口返回 url 中的字段替换为图片的宽和高
                  src={movieObj.img.replace(/w.h/, '160.220')}
                  alt=""
                />
                <span className="movieList_item_info">
                  <p className="movieList_item_title">{movieObj.nm}</p>
                  <p className="movieList_item_rate">{movieObj.sc}</p>
                </span>
                <div className="movieList_item_detail">
                  <p className="movieList_item_detail_title">{movieObj.nm}</p>
                  <p className="movieList_item_detail_date">
                    {movieObj.rt} 上映
                  </p>
                  <p className="movieList_item_detail_starring">
                    主演 {movieObj.star.replaceAll(',', ' / ')}
                  </p>
                  <p className="movieList_item_detail_wish">
                    {movieObj.wish} 人想看
                  </p>
                  <i className="movieList_item_detail_rate">{movieObj.sc}</i>
                </div>
              </li>
            ))}
          </ul>
        </SlideItem>
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
