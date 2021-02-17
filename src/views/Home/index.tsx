import React, { FC, useState, useEffect } from 'react';
import { getHotMovies, getCommingMovie } from '@network/movie';

import './_style.scss';

const Home: FC = (props) => {
  let [movieList, setMovieList] = useState<Array<dataTypes.IMovieListObj>>([]);

  useEffect(() => {
    getHotMovies().then((res: dataTypes.hotMoviesResponseData) => {
      console.log(res.total, res.movieList.length);

      setMovieList(res.movieList);
    });
  }, []);

  /**
   * 返回当前热映电影列表，为 li 元素
   * @param {*} props
   * @return {Array<JSX.Element>}
   */
  const renderHotMovieList: () => Array<JSX.Element> = () =>
    movieList.map((movieObj) => (
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
      <div className="hotMovies_title">正在热映</div>
      <ul className="hotMovies_list">{renderHotMovieList()}</ul>
    </div>
  );
};

export default Home;
