import React, { CSSProperties, FC, useContext } from 'react';
import { SlideCtx } from './index';
import classNames from 'classnames';
import Transition from '@cpnt/Transition';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface ISlideItemProps {
  index?: number;
  className?: string;
  style?: CSSProperties;
}

const SlideItem: FC<ISlideItemProps> = ({
  index,
  className,
  style,
  children
}) => {
  const { activeIdx } = useContext(SlideCtx);
  // TODO 用 React-Transition 添加过渡动画

  const classes = classNames('slide_item', className, {
    slide_item_active: index === activeIdx
  });

  return (
    // TODO 反向动画
    <Transition
      key={index}
      in={index === activeIdx}
      appear
      timeout={300}
      unmountOnExit={false}
      transitionAppear
      classNames={{
        enter: 'slideAnimation_enter',
        enterActive: 'slideAnimation_enter_active',
        exit: 'slideAnimation_exit',
        exitActive: 'slideAnimation_exit_active'
      }}
    >
      <li className={classes} style={style}>
        {children}
      </li>
    </Transition>
  );
};

export default SlideItem;
