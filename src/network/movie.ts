import instance from './request';

export function getHotMovie() {
  return instance({
    // url: '/hotmovie',
    url: 'movieOnInfoList',
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
