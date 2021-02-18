import React, { FC, useState, useEffect } from 'react';
import Slide from '@cpnt/Slide';
import SlideItem from '@/components/Slide/slideItem';

import { getHotMovies, getCommingMovie } from '@network/movie';

import './_style.scss';

const Home: FC = (props) => {
  let [movieList, setMovieList] = useState<Array<dataTypes.IMovieListObj>>([]);

  useEffect(() => {
    // TODO 猫眼 AJAX
    // getHotMovies().then((res: dataTypes.hotMoviesResponseData) => {
    //   setMovieList(res.movieList);
    // });
  }, []);

  /**
   * 返回当前热映电影列表，为 li 元素
   * @param {*} props
   * @return {Array<JSX.Element>}
   */
  const renderHotMovieList: () => Array<JSX.Element> = () =>
    movieList?.map((movieObj) => (
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
      </li>
    ));

  return (
    <div className="homepage">
      <Slide className="slide">
        <SlideItem index={0}>0</SlideItem>
        <SlideItem index={1}>1</SlideItem>
        <SlideItem index={2}>2</SlideItem>
        <SlideItem index={3}>3</SlideItem>

        {/* <div className="slide_item">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </div>
        <div className="slide_item">
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </div>
        <div className="slide_item">
          <li>7</li>
          <li>8</li>
          <li>9</li>
        </div> */}
      </Slide>

      <div className="hotMovies_title">正在热映</div>
      <ul className="hotMovies_list">{renderHotMovieList()}</ul>
    </div>
  );
};

export default Home;
