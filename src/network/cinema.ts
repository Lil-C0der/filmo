import instance from './request';

export function getIp() {
  return instance({
    url: 'baidu',
    method: 'GET'
  });
}

export function getCinemaInfo(
  day: string,
  cityId: number,
  updateShowDay: boolean = true,
  limit: number = 20
) {
  return instance({
    url: 'maoyan/cinemaList',
    method: 'GET',
    params: { day, cityId, updateShowDay, limit }
  });
}

export function filterCinemas(cityId: number) {
  return instance({
    url: 'maoyan/filterCinemas',
    method: 'GET',
    params: { cityId }
  });
}
