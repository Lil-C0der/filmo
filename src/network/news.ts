import instance from './request';

/**
 * 获取各个分类下的新闻，来自 tianapi.com
 * @export
 * @param {number} num
 * @param {number} [col=40]
 * @return {*}
 */
export function getNews(num: number, col: number) {
  return instance<dataTypes.newsResponseData>({
    url: 'tian/allnews/index',
    params: {
      num,
      col
    }
  });
}

/**
 * 获取娱乐花边新闻，对应 getNews(num, 10)，来自 tianapi.com
 * @export
 * @param {number} num
 * @param {number} [col=40]
 * @return {*}
 */
export function getEntNews(num: number) {
  return instance<dataTypes.newsResponseData>({
    url: 'tian/huabian',
    params: {
      num
    }
  });
}

/**
 * 获取影视资讯，对应 getNews(num, 40)，来自 tianapi.com
 * @export
 * @param {number} num
 * @param {number} [col=40]
 * @return {*}
 */
export function getMoviesNews(num: number) {
  return instance<dataTypes.newsResponseData>({
    url: 'tian/film/index',
    params: {
      num
    }
  });
}
