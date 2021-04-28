import React, { FC, useCallback, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { searchSuggestion } from '@network/search';
import { Button, Menu } from 'woo-ui-react';

import { observer, useLocalStore } from 'mobx-react-lite';
import store from '@store/index';

import './_style.scss';
// import { MENUINDEX, useActiveMenuItem } from '@/utils/hooks';

export enum MENUINDEX {
  MOVIE = '/movie',
  NEWS = '/news',
  PROFILE = '/profile',
  COMMUNITY = '/community'
}

const NavBar: FC = observer(() => {
  const location = useLocation();
  const userModel = useLocalStore(() => store);
  const history = useHistory();

  // 初始化时通过路由解析当前的 menu index
  const parseMenuIndexByPathname = useCallback(() => {
    const { pathname } = location;

    if (pathname === '/' || !pathname) {
      return MENUINDEX.MOVIE;
    }
    if (['/login', '/profile'].includes(pathname)) {
      return MENUINDEX.PROFILE;
    }
    if (pathname.includes('/news')) {
      return MENUINDEX.NEWS;
    }
    if (pathname.includes('/community') || pathname.includes('/post')) {
      return MENUINDEX.COMMUNITY;
    } else {
      console.log(pathname);
    }
  }, [location]);

  const [activeIdx, setActiveIdx] = useState<string>(
    () => parseMenuIndexByPathname() as string
  );

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

  const onLogoutBtnClick = useCallback(() => {
    if (userModel.isLogin) {
      console.log('退出');
      userModel.logout();
      localStorage.removeItem('user-token');
      if (activeIdx !== MENUINDEX.PROFILE) {
        history.push('/');
        setActiveIdx(MENUINDEX.MOVIE);
      }
    } else {
      history.push('/login');
      setActiveIdx(MENUINDEX.PROFILE);
    }
  }, [history, userModel, activeIdx]);

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
            <Button
              className="navbar_search_btn"
              size="lg"
              onClick={onSearchBtnClick}
            >
              搜索
              <FontAwesomeIcon
                className="navbar_search_btn_icon"
                icon="search"
                size="2x"
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="navbar_secondary">
        <ul>
          <Menu
            selectedIndex={activeIdx}
            onClick={(index: string) => {
              setActiveIdx(index);
            }}
            trigger="click"
            vertical={false}
          >
            <Menu.Item index={MENUINDEX.MOVIE}>
              <Link to={'/'} className="navbar_item">
                电影
              </Link>
            </Menu.Item>

            <Menu.Item index={MENUINDEX.PROFILE}>
              <Link to={'/profile'} className="navbar_item">
                个人中心
              </Link>
            </Menu.Item>

            <Menu.Item index={MENUINDEX.NEWS}>
              <Link to={'/news/movie'} className="navbar_item">
                行业资讯
              </Link>
            </Menu.Item>

            <Menu.Item index={MENUINDEX.COMMUNITY}>
              <Link to={'/community'} className="navbar_item">
                社区
              </Link>
            </Menu.Item>
          </Menu>

          <Button className="navbar_logoutBtn" onClick={onLogoutBtnClick}>
            {userModel.isLogin ? '登出' : '登录'}
          </Button>
        </ul>
      </div>
    </div>
  );
});

export default NavBar;
