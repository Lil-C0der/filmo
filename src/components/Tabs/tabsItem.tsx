import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';

export interface ITabsItemProps {
  name?: string; // tabItem 的标签名
  disabled?: boolean;
  index: number | string;
  style?: CSSProperties;
  className?: string;
}

const TabsItem: FC<ITabsItemProps> = ({
  index,
  style,
  className,
  children
}) => {
  const classes = classNames('tabs-pane', className);

  return (
    <div style={style} className={classes}>
      {children}
    </div>
  );
};

export default TabsItem;
