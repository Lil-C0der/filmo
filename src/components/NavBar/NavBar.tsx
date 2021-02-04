import React, { FC } from 'react';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './_style.scss';

library.add(fas);

const NavBar: FC = () => {
  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="navbar_primary">
          <div className="navbar_logo"></div>
          <div className="navbar_search">
            <input
              className="navbar_search_input"
              placeholder="搜索电影剧集、影人、影视原声"
            ></input>
            <div className="navbar_search_btn">
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

      <div
        className="navbar_secondary"
        style={{
          WebkitTextStroke: '1px #333',
          color: 'white',
          fontSize: '4em'
        }}
      >
        "SECONDARY"
      </div>
    </div>
  );
};

export default NavBar;
