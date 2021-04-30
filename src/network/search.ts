import instance from './request';

// https://maoyan.com/ajax/suggest?kw=
// export function searchSuggestion(kw: string, cityId: number = 10, stype = -1) {
export function searchSuggestion(kw: string, cityId: number = 10, stype = -1) {
  return instance<dataTypes.searchSuggestionResponseData>({
    url: 'maoyan/search',
    method: 'GET',
    params: { kw, cityId, stype }
  });
}

export function getMoreSearchRes(
  keyword: string,
  offset = 20,
  limit = 20,
  ci = 10
) {
  return instance<dataTypes.totalSearchResResponseData>({
    // 'm.maoyan.com/searchlist/movies?keyword=Searching&ci=10&offset=20&limit=20',
    url: 'maoyanv1/searchlist/movies',
    method: 'GET',
    params: { keyword, ci, offset, limit }
  });
}
