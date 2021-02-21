import { FC } from 'react';
import Slide, { ISlideProps } from './slide';
import SlideItem, { ISlideItemProps } from './slideItem';

// 交叉类型，除了 ISlideProps 还具有 Item 属性，用于导出
export type SlideComponent = FC<ISlideProps> & {
  Item: FC<ISlideItemProps>;
};

const TransSlide = Slide as SlideComponent;
TransSlide.Item = SlideItem;

export default TransSlide;
