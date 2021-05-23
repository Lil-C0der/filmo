import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect } from 'react';

import styles from './_styles.module.scss';

export interface IProps {
  spinner: boolean;
  width?: string | number;
  height?: string | number;
}

const Spinner: FC<IProps> = (props) => {
  useEffect(() => {
    React.Children.map(props.children, (child) => {
      console.log(child);
    });
  }, [props.children]);

  return (
    <div className={styles['spinner-wrapper']}>
      {props.spinner ? (
        <FontAwesomeIcon size="5x" className={styles['spinner-icon']} icon="spinner" spin={props.spinner} />
      ) : null}
      {props.children}
    </div>
  );
};

export default Spinner;
