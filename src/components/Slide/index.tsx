import React, { CSSProperties, FC, useState } from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './_style.scss';

library.add(fas);

interface ISlideProps {
  className?: string;
  style?: CSSProperties;
}

export interface ISlideCtx {
  activeIdx?: number;
}
// 导出的 ctx 对象
export const SlideCtx = React.createContext<ISlideCtx>({ activeIdx: 1 });

const Slide: FC<ISlideProps> = (props) => {
  const [currIdx, setCurrIdx] = useState<number>(0);

  const classes = classNames('slide', props.className);

  const { length } = props.children as Array<React.ReactNode>;

  const handleRBtnClick = () => {
    if (currIdx + 1 === length) {
      return setCurrIdx(0);
    }
    setCurrIdx(currIdx + 1);
  };
  const handleLBtnClick = () => {
    if (currIdx <= 0) return;
    setCurrIdx(currIdx - 1);
  };

  return (
    <div className={classes} style={props.style}>
      <SlideCtx.Provider value={{ activeIdx: currIdx }}>
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
