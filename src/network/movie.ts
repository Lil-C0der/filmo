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

/**
 * 获取电影的详细信息
 * @param {string} movieId
 * @return {*}
 */
export function getMovieDetail(movieId: string | number) {
  return instance<dataTypes.movieInfoResponseData>({
    url: 'maoyan/detailmovie',
    method: 'GET',
    params: { movieId }
  });
}

/**
 * 获取电影的演职员
 * @param {string} movieId
 * @return {*}
 */
// http://api.maoyan.com/mmdb/movie/1299372/role/celebrities.json
// http://m.maoyan.com/mmdb/movie/1299372/role/celebrities.json
export function getMovieCeleb(movieId: string | number) {
  return instance<dataTypes.movieCelebsResponseData>({
    url: `maoyan2/movie/${movieId}/role/celebrities.json`,
    method: 'GET'
  });
}

// https://m.maoyan.com/mmdb/comments/movie/1299372.json
export function getMovieComments(movieId: string | number) {
  return instance<dataTypes.commentResponseData>({
    url: `maoyan2/comments/movie/${movieId}.json`,
    method: 'GET',
    params: { _v_: 'yes' }
  });
}
