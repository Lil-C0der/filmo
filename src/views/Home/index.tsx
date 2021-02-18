import React, { FC, useState, useEffect } from 'react';
import Slide from '@cpnt/Slide';
import SlideItem from '@/components/Slide/slideItem';

import { getHotMovies, getCommingMovie } from '@network/movie';

import './_style.scss';

const Home: FC = (props) => {
  let [movieList, setMovieList] = useState<Array<dataTypes.IMovieListObj>>([]);

  useEffect(() => {
    getHotMovies().then((res: dataTypes.hotMoviesResponseData) => {
      setMovieList(res.movieList);
    });
  }, []);

  /**
   * 返回当前热映电影列表，为 li 元素
   * @param {*} props
   * @return {Array<JSX.Element>}
   */
  const renderHotMovieList: () => Array<JSX.Element> = () =>
    movieList?.map((movieObj, index) => (
      <SlideItem index={index} className="movieList_item" key={movieObj.id}>
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
      </SlideItem>
    ));

  const renderSlideItem: () => Array<JSX.Element> = () => {
    const mockArr = [
      'a0',
      'b0',
      'c0',
      'd0',
      'a1',
      'b1',
      'c1',
      'd1',
      'a2',
      'b2',
      'c2',
      'd2',
      'a3',
      'b3',
      'c3',
      'd3'
    ];
    let slideItemArr: Array<JSX.Element> = [];

    // for (let startIdx = 0; startIdx < mockArr.length; startIdx += 4) {
    //   slideItemArr.push(
    //     <SlideItem index={startIdx / 4}>
    //       <ul className="hotMovies_list">
    //         {movieList.slice(startIdx, startIdx + 4).map((movieObj) => (
    //           <li className="movieList_item" key={movieObj.id}>
    //             <img
    //               className="movieList_item_img"
    //               // 需要将接口返回 url 中的字段替换为图片的宽和高
    //               src={movieObj.img.replace(/w.h/, '160.220')}
    //               alt=""
    //             />
    //             <span className="movieList_item_info">
    //               <p className="movieList_item_title">{movieObj.nm}</p>
    //               <p className="movieList_item_rate">{movieObj.sc}</p>
    //             </span>
    //           </li>
    //         ))}
    //       </ul>
    //     </SlideItem>
    //   );
    // }

    for (let startIdx = 0; startIdx < movieList.length; startIdx += 4) {
      slideItemArr.push(
        <SlideItem index={startIdx / 4}>
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
              </li>
            ))}
          </ul>
        </SlideItem>
      );
    }

    // return [<li>asd</li>];
    return slideItemArr;
  };

  return (
    <div className="homepage">
      <div className="hotMovies_title">正在热映</div>

      <Slide height="240px">{renderSlideItem()}</Slide>
    </div>
  );
};

export default Home;
