import React, { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';

import './_styles.scss';
import { getMoreSearchRes, searchSuggestion } from '@/network/search';
import { ISearchMovieItem } from '@/types';
import MovieItem from './movieItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IQuery {
  kw: string;
}

const sortMovieByTime = (movies: ISearchMovieItem[]) => {
  const yearParser = (timeStr: string): number => +timeStr.split('-')[0];

  return movies.sort((a, b) => yearParser(a.rt) - yearParser(b.rt));
};

const Search: FC = () => {
  const location = useLocation();
  const [kw, setKw] = useState('');
  const [total, setTotal] = useState(0);
  const [resList, setResList] = useState<ISearchMovieItem[]>([]);
  const [totalResList, setTotalResList] = useState<ISearchMovieItem[]>([]);
  const [currPageNum, setCurrPageNum] = useState(3);

  const [isLoading, setIsLoading] = useState(false);

  // console.log('location', location);

  const getSeachSuggestion = useCallback(async () => {
    // @ts-ignore
    const { kw } = queryString.parse<string>(location.search) as IQuery;
    setKw(kw);
    const { movies: res } = await searchSuggestion(kw);
    setResList(res.list);
    setTotal(res.total - 3);
  }, [location.search]);

  useEffect(() => {
    getSeachSuggestion();
  }, [getSeachSuggestion]);

  const loadMoreData = async () => {
    if (kw) {
      setIsLoading(true);
      const { movies } = await getMoreSearchRes(kw, currPageNum);
      setCurrPageNum(currPageNum + 20);
      setIsLoading(false);
      setResList([...resList, ...movies]);
      setTotal(total - 20);
    }
  };

  const loadMoreEl = (
    <div className="search-loadmore" onClick={loadMoreData}>
      加载更多（剩余 {total} 项）
      {isLoading ? <FontAwesomeIcon icon="spinner" spin={isLoading} /> : ''}
    </div>
  );

  return (
    <div className="search">
      <h2 className="search-title">
        关键字 “<i className="search-title_keyword">{kw}</i>” 的搜索结果：
      </h2>
      <ul>
        {resList.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </ul>
      {loadMoreEl}
    </div>
  );
};

export default Search;
