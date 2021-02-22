import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '@network/movie';
import DetailTop from './detailTop';
import DetailBTM from './detailBTM';
import { Button } from 'woo-ui-react';

import './_style.scss';

interface IParams {
  id: string;
}

const Detail: FC = (props) => {
  let { id } = useParams<IParams>();
  const [movieDetail, setMovieDetail] = useState<dataTypes.IMovieInfo | null>(
    null
  );

  const handleBtnClick = () => {
    getMovieDetail(id).then(({ detailMovie }) => {
      console.log(detailMovie);
      setMovieDetail(detailMovie);
    });
  };

  return (
    <div className="detail">
      "DETAIL"
      <p>{id}</p>
      <Button onClick={handleBtnClick}>DETAILS</Button>
      {/* 详情页上半部分，包括电影的基本信息如中英文名、评分等 */}
      <DetailTop movieDetail={movieDetail}></DetailTop>
      {/* 详情页下半部分，包括电影基本剧情、演员表等 */}
      <DetailBTM movieDetail={movieDetail}></DetailBTM>
    </div>
  );
};

export default Detail;
