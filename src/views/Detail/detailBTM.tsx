import React, { FC } from 'react';
import Tabs from '@cpnt/Tabs';

interface IDetailTabsProps {
  movieDetail?: dataTypes.IMovieInfo | null;
}

const DetailBTM: FC<IDetailTabsProps> = ({ movieDetail }) => {
  return (
    <Tabs defaultIndex={1}>
      <Tabs.Item index={1} name={'介绍'}>
        INTRODUCE
      </Tabs.Item>
      <Tabs.Item index={2} name={'演员'}>
        ACTORS
      </Tabs.Item>
      <Tabs.Item index={3} name={'奖项'} disabled>
        AWARDS
      </Tabs.Item>
      <Tabs.Item index={4} name={'图集'}>
        GALLERY
      </Tabs.Item>
    </Tabs>
  );
};

export default DetailBTM;
