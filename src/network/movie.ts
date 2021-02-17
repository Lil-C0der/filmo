import instance from './request';

// import  from './dataTypes';

export function getAllCities() {
  return instance({
    url: 'maoyan/cities',
    method: 'GET'
  });
}

export function getHotMovies() {
  return instance<dataTypes.hotMoviesResponseData>({
    url: 'maoyan/movieOnInfoList',
    method: 'GET'
  });
}

/**
 *
 * @export
 * @param {number} cityId
 * @param {number} limit
 * @return {*}
 */
export function getCommingMovie(cityId: number, limit: number) {
  return instance({
    url: '/commingMovie',
    method: 'GET',
    params: { cityId, limit }
  });
}
