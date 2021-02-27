import instance from './request';

// https://maoyan.com/ajax/suggest?kw=
export function searchSuggestion(kw: string, cityId: number = 10, stype = -1) {
  return instance({
    // url: 'https://maoyan.com/ajax/suggest',
    // url: 'maoyan1/suggest',
    // url: `maoyan/search?kw=${kw}`,
    url: 'maoyan/search',
    method: 'GET',
    params: { kw, cityId, stype }
  });
}
