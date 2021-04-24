import React, { FC, useCallback, useEffect, useState } from 'react';
import { getUserDetail } from '@/network/users';
import { useHistory } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import store, { IUser } from '@/store';

import './_style.scss';
import { Tabs, Alert } from 'woo-ui-react';
import { IAlertProps } from 'woo-ui-react/dist/components/Alert/alert';

const defaultUserInfo: IUser = {
  username: '',
  token: '',
  createdAt: '',
  watchedList: [],
  favoritesList: [],
  posts: []
};

enum PROFILE_ALERT_MSG {
  TITLE = '未登录',
  DESCRIPTION = '正在为您跳转登录页..'
}

const mongoDataTransform = (date: string) => {
  if (!date) {
    return;
  }
  const dateArr = date.split('T');
  // console.log(dateArr);
  let timeArr = dateArr[1]?.split(':');
  timeArr[0] = String(+timeArr[0] + 8);
  console.log(timeArr);
  return `${dateArr[0]} ${timeArr[0]}:${timeArr[1]}`;
};

const placeholderEl = (
  <div className="profile-placeholder">暂时还没有内容~</div>
);

const Profile: FC = observer(() => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<IUser>(defaultUserInfo);
  const [alertConf, setAlertConf] = useState<IAlertProps>({
    title: '',
    description: '',
    type: 'primary'
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const loginUserModel = useLocalStore(() => store);

  const fetchUserInfo = useCallback(async (token: string) => {
    const { code, data } = await getUserDetail(token);
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
        setAlertVisible(false);
      }}
    />
  ) : null;

  useEffect(() => {
    console.log(loginUserModel.isLogin);
    const token = loginUserModel.token || localStorage.getItem('user-token');
    if (loginUserModel.isLogin || token) {
      token && fetchUserInfo(token);
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
              加入于 {mongoDataTransform(userInfo.createdAt)}
            </span>
          </div>

          <Tabs activeIndex="1" className="profile-tab">
            <Tabs.Item index="1" name="发表的内容">
              {userInfo.posts.length
                ? userInfo.posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))
                : placeholderEl}
            </Tabs.Item>

            <Tabs.Item index="2" name="收藏的电影">
              {userInfo.posts.length
                ? userInfo.posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))
                : placeholderEl}
            </Tabs.Item>

            <Tabs.Item index="3" name="看过的电影">
              {userInfo.posts.length
                ? userInfo.posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))
                : placeholderEl}
            </Tabs.Item>
          </Tabs>
        </>
      )}
    </div>
  );
});

export default Profile;
