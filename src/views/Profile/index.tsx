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

import styles from './_style.module.scss';
import MovieCard from '@/components/MovieCard';

const defaultUserInfo: IUserDetail = {
  id: '',
  username: '',
  createdAt: '',
  watchedList: [],
  collectionList: [],
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
      // loginUserModel.user = data.user;
    }
  }, []);

  let alertEl = alertVisible ? (
    <Alert
      closable
      className={styles['profile-alert']}
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
    const token = loginUserModel.token || localStorage.getItem('user-token');
    if (loginUserModel.isLogin || token) {
      token && fetchUserInfo();
    } else {
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
      <li key={post.id} className={styles['profile-posts']}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        <span className={styles['profile-posts_date']}>
          {parseMongoDate(post.createdAt)}
        </span>
      </li>
    ))
  ) : (
    <Placeholder />
  );

  const collectionListEl = userInfo.collectionList.length ? (
    // userInfo.collectionList.map((m) => <li key={m.id}>{m.id}</li>)
    userInfo.collectionList.map((m) => (
      <li key={m.id}>
        <MovieCard
          width="160px"
          height="220px"
          imgWidth={160}
          imgHeight={220}
          className={styles.movieList_item}
          movieItem={{ ...m, img: m.imgUrl }}
          isComingMovie={false}
        />
      </li>
    ))
  ) : (
    <Placeholder />
  );

  return (
    <div className={styles.profile}>
      {alertEl}
      {alertVisible ? (
        alertEl
      ) : (
        <>
          <div className={styles['profile-intro']}>
            <h1 className={styles['profile-intro_username']}>
              {userInfo.username}
            </h1>
            <span className={styles['profile-intro_registerDate']}>
              加入于 {parseMongoDate(userInfo.createdAt)}
            </span>
          </div>

          <Tabs activeIndex="1" className={styles['profile-tab']}>
            <Tabs.Item
              className={styles['profile-tab_content']}
              index="1"
              name="发表的内容"
            >
              {postsEl}
            </Tabs.Item>

            <Tabs.Item
              className={styles['profile-tab_content']}
              index="2"
              name="收藏的电影"
            >
              {collectionListEl}
            </Tabs.Item>

            <Tabs.Item
              className={styles['profile-tab_content']}
              index="3"
              name="看过的电影"
            >
              {userInfo.watchedList.length ? (
                userInfo.watchedList.map((m) => <li key={m.id}>{m.title}</li>)
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
