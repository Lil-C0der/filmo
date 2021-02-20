import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '@network/movie';

interface IParams {
  id: string;
}

const Detail: FC = (props) => {
  let { id } = useParams<IParams>();
  console.log(id);

  const handleBtnClick = () => {
    getMovieDetail(id).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      "DETAIL"
      <p>{id}</p>
      <div className="btn" onClick={handleBtnClick}>
        DETAILS
      </div>
    </div>
  );
};

export default Detail;
