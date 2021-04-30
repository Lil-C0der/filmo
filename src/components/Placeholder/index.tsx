import React, { FC } from 'react';
import styles from './_styles.module.scss';

const Placeholder: FC = (props) => {
  return (
    <div className={styles.placeholder}>
      {props.children ? props.children : '暂时还没有内容~'}
    </div>
  );
};

export default Placeholder;
