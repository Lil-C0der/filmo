import instance from './request';

// import  from './dataTypes';

export function getAllCities() {
  return instance({
    url: 'maoyan/cities',
    method: 'GET'
  });
}

/**
 * 获取正在热映的电影信息
 * @return {*}
 */
export function getHotMovies() {
  return instance<dataTypes.hotMoviesResponseData>({
    url: 'maoyan/movieOnInfoList',
    method: 'GET'
  });
}

/**
 *
 * 获取即将上映的电影信息
 * @param {number} cityId
 * @param {number} limit
 * @return {*}
 */
export function getCommingMovie(cityId: number, limit: number) {
  return instance({
    url: 'maoyan/commingMovie',
    method: 'GET',
    params: { cityId, limit }
  });
}

export function getMovieDetail(movieId: string) {
  return instance<dataTypes.movieInfoResponseData>({
    url: 'maoyan/detailmovie',
    method: 'GET',
    params: { movieId }
  });
}
