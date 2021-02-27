import instance from './request';

export function getCastDetail(id: number | string) {
  return instance({
    url: `maoyan2/v6/celebrity/${id}.json`,
    method: 'GET'
  });
}
