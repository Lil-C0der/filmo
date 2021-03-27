import React, { FC, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { searchSuggestion } from '@network/search';

import './_style.scss';
interface NavBarProps {
  // onSearchBtnClick?: () => {};
}

const NavBar: FC<NavBarProps> = (props) => {
  // 获取搜索框元素
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchBtnClick = () => {
    // const inputVal = inputRef.current?.value;
    // inputVal && console.log('搜索框的内容：', inputVal);

    // getCurrLocation().then((res) => {
    //   console.log(res);
    // });

    searchSuggestion('唐人街').then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="navbar_primary">
          <Link
            to={'/'}
            className="navbar_logo"
            onClick={() => {
              console.log('to homepage');
            }}
          />
          <span className="navbar_city">
            <FontAwesomeIcon icon="map-marked-alt" />
            {localStorage.getItem('cityName')}
          </span>
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
          <Link
            to={'/'}
            className="navbar_item"
            onClick={() => {
              console.log('to homepage');
            }}
          >
            电影
          </Link>
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
