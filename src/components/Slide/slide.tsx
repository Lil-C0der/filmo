import React, {
  CSSProperties,
  FC,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import classNames from 'classnames';

import styles from './_style.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ISlideProps {
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
  reverseAnimation: false
});

const Slide: FC<ISlideProps> = (props) => {
  const { onChange, className, style } = props;
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [reverseAnimation, setReverseAnimation] = useState<boolean>(false);

  // @
  const classes = classNames(styles.slide, className);
  const { length } = props.children as Array<React.ReactNode>;

  // 切换时触发 onChange 回调
  useEffect(() => {
    onChange && onChange(currIdx);
  }, [currIdx, onChange]);

  // 两个切换按钮的点击事件
  const handleRBtnClick = useCallback(() => {
    reverseAnimation && setReverseAnimation(false);
    if (currIdx + 1 === length) {
      return setCurrIdx(0);
    }
    setCurrIdx(currIdx + 1);
  }, [currIdx, reverseAnimation, length]);

  const handleLBtnClick = () => {
    !reverseAnimation && setReverseAnimation(true);
    if (currIdx <= 0) {
      return setCurrIdx(length - 1);
    }
    setCurrIdx(currIdx - 1);
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoverRef = useRef(false);

  // 自动轮播
  const startTimer: () => NodeJS.Timeout | null = useCallback(() => {
    // 创建定时器时可能存在其他的轮播定时器，先清除
    if (timerRef.current) {
      stopTimer(timerRef.current);
    }
    const interval = props.interval ? props.interval : 3000;
    let timerId = setInterval(() => {
      handleRBtnClick();
    }, interval);
    return timerId;
  }, [handleRBtnClick, props.interval]);

  const stopTimer = (timerId?: NodeJS.Timeout | null) => {
    timerId && clearInterval(timerId);
    return null;
  };

  useEffect(() => {
    if (isHoverRef.current) {
      return;
    }
    timerRef.current = startTimer();

    return () => {
      timerRef.current = stopTimer(timerRef.current);
    };
  }, [startTimer]);

  const handleMouseEnter = () => {
    isHoverRef.current = true;
    timerRef.current = stopTimer(timerRef.current);
  };
  const handleMouseLeave = () => {
    isHoverRef.current = false;
    timerRef.current = startTimer();
  };

  return (
    <div
      className={classes}
      style={{ height: props.height, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SlideCtx.Provider
        value={{ activeIdx: currIdx, reverseAnimation: reverseAnimation }}
      >
        <FontAwesomeIcon
          className={`${styles.slide_arrow} ${styles.slide_arrow_l}`}
          icon="chevron-circle-left"
          onClick={handleLBtnClick}
        />
        <FontAwesomeIcon
          className={`${styles.slide_arrow} ${styles.slide_arrow_r}`}
          icon="chevron-circle-right"
          onClick={handleRBtnClick}
        />

        <div className={styles.slide_wrapper}>{props.children}</div>
      </SlideCtx.Provider>
    </div>
  );
};

export default Slide;
