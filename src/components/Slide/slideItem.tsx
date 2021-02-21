import React, { CSSProperties, FC, useContext } from 'react';
import { SlideCtx } from './slide';
import classNames from 'classnames';
import Transition from '@cpnt/Transition';

import './_style.scss';

export interface ISlideItemProps {
  index: number;
  className?: string;
  style?: CSSProperties;
}

const SlideItem: FC<ISlideItemProps> = ({
  index,
  className,
  style,
  children
}) => {
  const { activeIdx, reverseAnimation } = useContext(SlideCtx);
  const classes = classNames('slide_item', className, {
    slide_item_active: index === activeIdx
  });

  return (
    <Transition
      in={index === activeIdx}
      appear
      timeout={300}
      unmountOnExit={false}
      classNames={reverseAnimation ? 'slideFromLToR' : 'slideFromRToL'}
    >
      <div className={classes} style={style}>
        {children}
      </div>
    </Transition>
  );
};

export default SlideItem;
