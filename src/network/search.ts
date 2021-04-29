import instance from './request';

// https://maoyan.com/ajax/suggest?kw=
// export function searchSuggestion(kw: string, cityId: number = 10, stype = -1) {
export function searchSuggestion(kw: string, cityId: number = 10, stype = 1) {
  return instance({
    // url: 'https://maoyan.com/ajax/suggest',
    // url: 'maoyan1/suggest',
    // url: `maoyan/search?kw=${kw}`,
    url: 'maoyan/search',
    method: 'GET',
    params: { kw, cityId, stype }
  });
}

export function searchAll(kw: string) {
  return instance({
    url:
      'm.maoyan.com/searchlist/movies?keyword=Searching&ci=10&offset=20&limit=20',
    method: 'GET'
  });
}
