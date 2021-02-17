import React, { FC, useContext } from 'react';
import { ISlideCtx, SlideCtx } from './index';

interface ISlideItemProps {
  index?: number;
}

const SlideItem: FC<ISlideItemProps> = ({ index, children }) => {
  const { activeIdx } = useContext(SlideCtx);
  // TODO 用 React-Transition 添加过渡动画
  if (index === activeIdx) {
    return <li>{children}</li>;
  } else {
    return null;
  }
};

export default SlideItem;
