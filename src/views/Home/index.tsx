import React, { FC, useState, useEffect } from 'react';
import MovieListItem from './movieListItem';
import Slide from '@cpnt/Slide';
import {
  getHotMovies,
  getCommingMovie,
  getDoubanHotMovies
} from '@network/movie';
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
  const [doubanHotMovieList, setDoubanHotMovieList] = useState(
    defaultMovieListObj.hot
  );

  useEffect(() => {
    const initMovieList = async () => {
      const { hot } = await (await getHotMovies()).data;
      const { coming } = await (await getCommingMovie()).data;
      const data = await getDoubanHotMovies();

      // const temp = data.map((item) => {
      //   console.log(item);
      //   return item;
      //   // return {
      //   //   desc: item.actors
      //   //   // dra:
      //   // };
      // });

      const arr = Object.keys(data).map((key: string) => {
        return data[key];
      });
      const temp = arr.map((item) => {
        return {
          boxInfo: '',
          fra: item.region,
          desc: item.actors,
          id: +item.id,
          nm: item.name,
          sc: item.rating,
          star: item.actors,
          wish: 0,
          img: item.image,
          rt: item.release
        };
      });

      setDoubanHotMovieList(temp);
      setMovieListObj({ hot, coming });
    };
    initMovieList();
  }, []);

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

      <div className="movies_title doubanHotMovies_title">热门电影</div>
      <div className="doubanHotMovies_wrapper">
        {doubanHotMovieList.map((movieItem) => (
          <MovieListItem
            key={movieItem.id}
            movieItem={movieItem}
            isComingMovie={false}
          ></MovieListItem>
        ))}
      </div>
    </div>
  );
};

export default Home;
