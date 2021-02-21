import { FC } from 'react';
import Tabs, { ITabsProps } from './tabs';
import TabsItem, { ITabsItemProps } from './tabsItem';

type TabsComponent = FC<ITabsProps> & {
  Item: FC<ITabsItemProps>;
};

const TransTabs = Tabs as TabsComponent;
TransTabs.Item = TabsItem;

export default TransTabs;
