import React, { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';

import './_styles.scss';

const Search: FC = () => {
  const { kw: keyword } = useParams<{ kw: string }>();
  const location = useLocation();

  useEffect(() => {
    console.log('location', location);
    console.log(queryString.parse(location.search));
  });
  return <div className="search">SEARCHING: {keyword}</div>;
};

export default Search;
