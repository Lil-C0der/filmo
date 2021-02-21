import React, {
  FC,
  CSSProperties,
  FunctionComponentElement,
  useState
} from 'react';
import classNames from 'classnames';
import { ITabsItemProps } from './tabsItem';
import './_style.scss';

export interface ITabsProps {
  defaultIndex?: string | number;
  className?: string;
  style?: CSSProperties;
}

type TabsItemEl = FunctionComponentElement<ITabsItemProps>;

const Tabs: FC<ITabsProps> = ({ defaultIndex, className, style, children }) => {
  const [currIdx, setCurrIdx] = useState(defaultIndex);

  const renderTabsHead = () => {
    return React.Children.map(children, (child) => {
      const childComponent = child as TabsItemEl;
      // console.log(childComponent.props);
      const { name } = childComponent.props;
      // console.log(name);

      return <li className="tabs_head">{name}</li>;
    });
  };

  const renderTabsContent = () => {
    return React.Children.map(children, (child) => {
      const childComponent = child as TabsItemEl;
      const { index } = childComponent.props;
      return index === currIdx ? childComponent : '';
    });
  };

  const renderTabsItem = () => {
    console.log('called');

    return React.Children.map(children, (child, i) => {
      const childComponent = child as TabsItemEl;
      const { index, name, disabled } = childComponent.props;

      const isActive = defaultIndex ? defaultIndex === index : i === 0;
      const tabsHeadClasses = classNames('tabs_head_item', {
        tabs_head_item_active: isActive,
        tabs_head_item_disabled: disabled
      });
      const tabsHeadEl = <li className={tabsHeadClasses}>{name}</li>;

      if (defaultIndex) {
        return {
          tabsHeadEl,
          tabsContentEl:
            childComponent.props.index === currIdx ? childComponent : ''
        };
      } else {
        return {
          tabsHeadEl,
          tabsContentEl: i === 0 ? childComponent : ''
        };
      }
    });
  };

  return (
    <div>
      "Tabs"
      {/* {children} */}
      {/* <ul className="tabs_head_wrapper">{renderTabsHead()}</ul>
      <div>{renderTabsContent()}</div> */}
      <ul className="tabs_head">
        {renderTabsItem()?.map((elObj) => {
          return elObj.tabsHeadEl;
        })}
      </ul>
      <div className="tabs_content">
        {renderTabsItem()?.map((elObj) => elObj.tabsContentEl)}
      </div>
    </div>
  );
};

export default Tabs;
