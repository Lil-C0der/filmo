import React, { FC, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './_style.scss';

library.add(fas);

interface NavBarProps {
  // onSearchBtnClick?: () => {};
}

const NavBar: FC<NavBarProps> = (props) => {
  // 获取搜索框元素
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchBtnClick = () => {
    const inputVal = inputRef.current?.value;
    inputVal && console.log('搜索框的内容：', inputVal);
  };

  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="navbar_primary">
          <div
            className="navbar_logo"
            onClick={() => {
              console.log('to homepage');
            }}
          />
          <div className="navbar_search">
            <input
              className="navbar_search_input"
              placeholder="搜索电影剧集、影人、影视原声"
              ref={inputRef}
            ></input>
            <div className="navbar_search_btn" onClick={onSearchBtnClick}>
              搜索
              <FontAwesomeIcon
                className="navbar_search_btn_icon"
                icon="search"
                size="2x"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="navbar_secondary">
        <ul>
          <li className="navbar_item">电影</li>
          <li className="navbar_item">影人</li>
          <li className="navbar_item">影视原声</li>
          {/* <li className="navbar_item">登录/注册</li> */}
          <li className="navbar_item">留言</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
