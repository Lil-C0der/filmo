import React, { FC } from 'react';
import './_styles.scss';

const Placeholder: FC = (props) => {
  return (
    <div className="placeholder">
      {props.children ? props.children : '暂时还没有内容~'}
    </div>
  );
};

export default Placeholder;
