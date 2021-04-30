import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getEntNews, getMoviesNews } from '@/network/news';
import { useParams } from 'react-router';
import { useDebounce } from '@hooks/index';

import styles from './_styles.module.scss';
import { INewsItem } from '@/types';

enum newsType {
  ENT = 'ent',
  MOVIE = 'movie'
}

interface INewsType {
  newsType: newsType;
}

const fetchMovieNews = async (num: number) => {
  const moviesNews = await (await getMoviesNews(num)).newslist;
  return moviesNews;
};
const fetchEntNews = async (num: number) => {
  const entNews = await (await getEntNews(num)).newslist;
  return entNews;
};

const fetchMap = {
  movie: fetchMovieNews,
  ent: fetchEntNews
};

const titleMap = {
  movie: '影视圈',
  ent: '娱乐圈'
};

const News: FC = () => {
  const { newsType } = useParams<INewsType>();
  const [newsList, setNewsList] = useState<INewsItem[]>();
  const newWrapperRef = useRef<HTMLDivElement | null>(null);

  const fetchNews = useCallback(
    async (num: number) => {
      const res = await fetchMap[newsType](num);
      setNewsList(res);
    },
    [newsType]
  );

  const debounceFetchNews = useDebounce(fetchNews);

  const onScroll = useCallback(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight && newsList?.length) {
      // 继续请求10条数据
      const { length } = newsList;
      length < 50 && debounceFetchNews(length + 10);
    }
  }, [debounceFetchNews, newsList]);

  useEffect(() => {
    // 初始化时请求20条
    fetchNews(20);
  }, [fetchNews]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, newWrapperRef]);

  return (
    <div className={styles.news}>
      <h2 className={styles['news-title']}>{titleMap[newsType]}资讯</h2>
      {newsList?.map((news) => (
        <div key={news.id} className={styles['news-item']}>
          <div className={styles['news-item_intro']}>
            <div className={styles['news-item_picWrapper']}>
              <img src={news.picUrl} alt="" />
            </div>
            <div className={styles['news-item_wrapper']}>
              <a
                className={styles['news-item_title']}
                href={news.url}
                target="__blank"
              >
                {news.title}
              </a>
              <p className={styles['news-item_time']}>{news.ctime}</p>
              <p className={styles['news-item_source']}>来源：{news.source}</p>
            </div>
          </div>

          <div className={styles['news-item_desc']}>{news.description}</div>
        </div>
      ))}
    </div>
  );
};

export default News;
