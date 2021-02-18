import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName =
  | 'fade'
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  // 添加 wrapper 属性，防止 transition 和 transform 覆盖原有样式
  wrapper?: boolean;
};

const Transition: FC<TransitionProps> = (props) => {
  const { animation, wrapper, classNames, children, ...restProps } = props;

  return (
    <CSSTransition
      classNames={animation ? animation : classNames}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  appear: true,
  // exit 时默认卸载子节点
  unmountOnExit: true,
  wrapper: false
};

export default Transition;
