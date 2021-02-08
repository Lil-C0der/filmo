import instance from './request';

export function getAllCities() {
  return instance({
    url: 'maoyan/cities',
    method: 'GET'
  });
}

export function getHotMovie() {
  return instance({
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
