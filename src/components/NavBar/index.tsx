import React, { FC, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Menu } from 'woo-ui-react';
import Input from '../Input';
import { observer, useLocalStore } from 'mobx-react-lite';
import store from '@store/index';

import styles from './_style.module.scss';

export enum MENUINDEX {
  MOVIE = '/movie',
  NEWS = '/news',
  PROFILE = '/profile',
  COMMUNITY = '/community',
}

const NavBar: FC = observer(() => {
  const location = useLocation();
  const userModel = useLocalStore(() => store);
  const history = useHistory();
  const [inputVal, setInputVal] = useState('');

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
    }
  }, [location]);

  const [activeIdx, setActiveIdx] = useState<string>(() => parseMenuIndexByPathname() as string);

  useEffect(() => {
    // menu 的 selectedIndex 受控
    setActiveIdx(parseMenuIndexByPathname()!);
  }, [parseMenuIndexByPathname]);

  const onSearchBtnClick = () => {
    history.push(`/search?kw=${inputVal}`);
    setInputVal('');
  };

  const onLogoutBtnClick = useCallback(() => {
    if (userModel.isLogin) {
      userModel.logout();
      localStorage.removeItem('user-token');
      if (activeIdx === MENUINDEX.PROFILE) {
        history.push('/');
      }
    } else {
      history.push('/login');
    }
  }, [history, userModel, activeIdx]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_wrapper}>
        <div className={styles.navbar_primary}>
          <Link
            to={'/'}
            className={styles.navbar_logo}
            onClick={() => {
              console.log('to homepage');
            }}
          />
          <span className={styles.navbar_city}>
            <FontAwesomeIcon icon="map-marked-alt" />
            {localStorage.getItem('cityName')}
          </span>
          <div className={styles.navbar_search}>
            <Input
              className={styles.navbar_search_input}
              placeholder="搜索电影剧集、影人"
              value={inputVal}
              onChange={setInputVal}
            />
            <Button className={styles.navbar_search_btn} size="lg" onClick={onSearchBtnClick}>
              搜索
              <FontAwesomeIcon className={styles.navbar_search_btn_icon} icon="search" size="2x" />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.navbar_secondary}>
        <ul>
          <Menu className={styles.navbar_menu} selectedIndex={activeIdx} trigger="click" vertical={false}>
            <Menu.Item index={MENUINDEX.MOVIE} className={styles.menuItem}>
              <Link to={'/'} className={styles.navbar_item}>
                电影
              </Link>
            </Menu.Item>

            <Menu.Item index={MENUINDEX.PROFILE} className={styles.menuItem}>
              <Link to={'/profile'} className={styles.navbar_item}>
                个人中心
              </Link>
            </Menu.Item>

            <Menu.Item index={MENUINDEX.NEWS} className={styles.menuItem}>
              <Link to={'/news/movie'} className={styles.navbar_item}>
                行业资讯
              </Link>
            </Menu.Item>

            <Menu.Item index={MENUINDEX.COMMUNITY} className={styles.menuItem}>
              <Link to={'/community'} className={styles.navbar_item}>
                社区
              </Link>
            </Menu.Item>
          </Menu>

          <Button className={styles.navbar_logoutBtn} onClick={onLogoutBtnClick}>
            {userModel.isLogin ? '登出' : '登录'}
          </Button>
        </ul>
      </div>
    </div>
  );
});

export default NavBar;
