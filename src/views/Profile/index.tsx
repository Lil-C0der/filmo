import React, { FC, useCallback, useEffect, useState } from 'react';
import { getUserDetail } from '@/network/users';
import { useHistory } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import store from '@/store';
import { Tabs, Alert } from 'woo-ui-react';
import { IAlertProps } from 'woo-ui-react/dist/components/Alert/alert';
import { parseMongoDate } from '@/utils';
import Placeholder from '@/components/Placeholder';
import { Link } from 'react-router-dom';
import { IUserDetail } from '@/types';

import './_style.scss';

const defaultUserInfo: IUserDetail = {
  id: '',
  username: '',
  createdAt: '',
  watchedList: [],
  favoritesList: [],
  posts: []
};

enum PROFILE_ALERT_MSG {
  TITLE = '未登录',
  DESCRIPTION = '正在为您跳转登录页..'
}

const Profile: FC = observer(() => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<IUserDetail>(defaultUserInfo);
  const [alertConf, setAlertConf] = useState<IAlertProps>({
    title: '',
    description: '',
    type: 'primary'
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const loginUserModel = useLocalStore(() => store);

  const fetchUserInfo = useCallback(async () => {
    const { code, data } = await getUserDetail();
    if (code === 200 && data) {
      setUserInfo(data.user);
    }
  }, []);

  let alertEl = alertVisible ? (
    <Alert
      closable
      className="profile-alert"
      title={alertConf.title}
      description={alertConf.description}
      type={alertConf.type}
      onClose={() => {
        alertEl = null;
        setTimeout(() => {
          setAlertVisible(false);
        }, 300);
      }}
    />
  ) : null;

  useEffect(() => {
    console.log(loginUserModel.isLogin);
    const token = loginUserModel.token || localStorage.getItem('user-token');
    if (loginUserModel.isLogin || token) {
      console.log('登录了');

      token && fetchUserInfo();
    } else {
      // console.log('未登录，正在跳转登录页');
      setAlertConf({
        title: PROFILE_ALERT_MSG.TITLE,
        description: PROFILE_ALERT_MSG.DESCRIPTION,
        type: 'warn'
      });
      setAlertVisible(true);

      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }
  }, [fetchUserInfo, history, loginUserModel]);

  const postsEl = userInfo.posts.length ? (
    userInfo.posts.map((post) => (
      <li key={post.id} className="profile-posts">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        <span className="profile-posts_date">
          {parseMongoDate(post.createdAt)}
        </span>
      </li>
    ))
  ) : (
    <Placeholder />
  );

  return (
    <div className="profile">
      {alertEl}
      {alertVisible ? (
        alertEl
      ) : (
        <>
          <div className="profile-intro">
            <h1 className="profile-intro_username">{userInfo.username}</h1>
            <span className="profile-intro_registerDate">
              加入于 {parseMongoDate(userInfo.createdAt)}
            </span>
          </div>

          <Tabs activeIndex="1" className="profile-tab">
            <Tabs.Item
              className="profile-tab_content"
              index="1"
              name="发表的内容"
            >
              {postsEl}
            </Tabs.Item>

            <Tabs.Item
              className="profile-tab_content"
              index="2"
              name="收藏的电影"
            >
              {userInfo.posts.length ? (
                userInfo.posts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))
              ) : (
                <Placeholder />
              )}
            </Tabs.Item>

            <Tabs.Item
              className="profile-tab_content"
              index="3"
              name="看过的电影"
            >
              {userInfo.posts.length ? (
                userInfo.posts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))
              ) : (
                <Placeholder />
              )}
            </Tabs.Item>
          </Tabs>
        </>
      )}
    </div>
  );
});

export default Profile;
