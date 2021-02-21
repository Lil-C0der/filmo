import React, { FC } from 'react';

interface IRateDistProps {
  distArr?: Array<{ movieScoreLevel: string; proportion: string }>;
}

const RateDist: FC<IRateDistProps> = ({ distArr }) => {
  return (
    <ul className="rate_dist">
      {distArr?.map(({ movieScoreLevel, proportion }) => (
        <li className="rate_dist_item">
          <span className="level">{movieScoreLevel}</span>
          <span className="bar" style={{ width: `${proportion}px` }}></span>
          <span className="proportion">{proportion}%</span>
        </li>
      ))}
    </ul>
  );
};

export default RateDist;
