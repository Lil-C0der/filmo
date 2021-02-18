import React, { CSSProperties, FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './_style.scss';

library.add(fas);

interface ISlideProps {
  height?: string;
  className?: string;
  style?: CSSProperties;
  interval?: number;
  onChange?: (currIdx: number) => void;
}

export interface ISlideCtx {
  activeIdx: number;
  // 默认从左向右轮播，reverse 为 true 时表示从右向左轮播
  reverseAnimation: boolean;
}
// 导出的 ctx 对象
export const SlideCtx = React.createContext<ISlideCtx>({
  activeIdx: 1,
  reverseAnimation: true
});

const Slide: FC<ISlideProps> = (props) => {
  const { onChange, className, style } = props;
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(true);

  const classes = classNames('slide', className);
  const { length } = props.children as Array<React.ReactNode>;

  // 切换时触发 onChange 回调
  useEffect(() => {
    onChange && onChange(currIdx);
  }, [currIdx, onChange]);

  // 两个切换按钮的点击事件
  const handleRBtnClick = () => {
    reverseAnimation && setReverseAnimation(false);
    if (currIdx + 1 === length) {
      return setCurrIdx(0);
    }
    setCurrIdx(currIdx + 1);
  };
  const handleLBtnClick = () => {
    !reverseAnimation && setReverseAnimation(true);
    if (currIdx <= 0) {
      return setCurrIdx(length - 1);
    }
    setCurrIdx(currIdx - 1);
  };

  // 自动轮播
  const startTimer = () => {
    const interval = props.interval ? props.interval : 3000;
    let timerId = setInterval(() => {
      handleRBtnClick();
    }, interval);
    return timerId;
  };
  const stopTimer = (timerId?: NodeJS.Timeout | null) => {
    timerId && clearInterval(timerId);
    return null;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null;
    timer = startTimer();
    return () => {
      timer = stopTimer(timer);
    };
  });

  // TODO hover 时停止自动轮播
  // const handleMouseEnter = () => {
  //   stopTimer();
  // };
  // const handleMouseLeave = () => {
  //   startTimer();
  // };

  return (
    <div
      className={classes}
      style={{ height: props.height, ...style }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <SlideCtx.Provider
        value={{ activeIdx: currIdx, reverseAnimation: reverseAnimation }}
      >
        <div className="slide_arrow slide_arrow_l" onClick={handleLBtnClick}>
          <FontAwesomeIcon icon="chevron-left" />
        </div>
        <div className="slide_arrow slide_arrow_r" onClick={handleRBtnClick}>
          <FontAwesomeIcon icon="chevron-right" />
        </div>
        <div className="slide_wrapper">{props.children}</div>
      </SlideCtx.Provider>
    </div>
  );
};

export default Slide;
