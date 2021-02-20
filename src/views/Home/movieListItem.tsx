import React, { FC } from 'react';
import { imgTransformer } from '@/utils';
import { Link } from 'react-router-dom';

interface IMovieListItemProps {
  movieObj: dataTypes.IMovieListObj;
}

const movieListItem: FC<IMovieListItemProps> = ({ movieObj }) => {
  return (
    <li className="movieList_item">
      <img
        className="movieList_item_img"
        // 需要将接口返回 url 中的字段替换为图片的宽和高
        src={imgTransformer(movieObj.img, 160, 220)}
        alt=""
      />
      <span className="movieList_item_info">
        <p className="movieList_item_title">{movieObj.nm}</p>
        <p className="movieList_item_rate">{movieObj.sc}</p>
      </span>
      {/* hover 时显示的 detail 卡片部分 */}
      <div className="movieList_item_detail">
        <p className="movieList_item_detail_title">
          <Link to={`/detail/${movieObj.id}`}>{movieObj.nm}</Link>
        </p>
        <p className="movieList_item_detail_date">{movieObj.rt} 上映</p>
        <p className="movieList_item_detail_starring">
          主演 {movieObj.star.replaceAll(',', ' / ')}
        </p>
        <p className="movieList_item_detail_wish">{movieObj.wish} 人想看</p>
        <i className="movieList_item_detail_rate">{movieObj.sc}</i>
      </div>
    </li>
  );
};

export default movieListItem;
