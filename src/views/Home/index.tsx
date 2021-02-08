import React, { FC, useEffect } from 'react';
import { getHotMovie, getCommingMovie } from '@network/movie';

const Home: FC = (props) => {
  useEffect(() => {
    getHotMovie().then((res) => {
      console.log(res);
    });
  });

  return <div>"HOME"</div>;
};

export default Home;
