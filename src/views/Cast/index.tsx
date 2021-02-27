import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { getCastDetail } from '@network/cast';
import { Button } from 'woo-ui-react';

interface ICastParams {
  id: string;
}

const Cast: FC = () => {
  const { id } = useParams<ICastParams>();

  const onDetailBtnClick = () => {
    getCastDetail(id).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      "CAST"
      <span>{id}</span>
      <Button onClick={onDetailBtnClick}>DETAIL</Button>
    </div>
  );
};

export default Cast;
