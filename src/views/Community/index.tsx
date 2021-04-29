import React, { FC, useCallback, useEffect, useState } from 'react';
import { getPostsList } from '@/network/post';
import { parseMongoDate } from '@/utils';
import { Link, useHistory } from 'react-router-dom';
import Placeholder from '@/components/Placeholder';
import { Alert, Button } from 'woo-ui-react';
import { IAlertProps } from 'woo-ui-react/dist/components/Alert/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './_styles.scss';
import { useLocalStore } from 'mobx-react-lite';
import store from '@/store';
import { IPost } from '@/types';

enum PROFILE_ALERT_MSG {
  TITLE = '未登录',
  DESCRIPTION = '正在为您跳转登录页..'
}

const Community: FC = () => {
  const history = useHistory();
  const [postList, setPostList] = useState<IPost[]>([]);

  const [alertConf, setAlertConf] = useState<IAlertProps>({
    title: '',
    description: '',
    type: 'primary'
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const userModel = useLocalStore(() => store);

  let alertEl = alertVisible ? (
    <Alert
      closable
      className="community-alert"
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

  const fetchPosts = async () => {
    const { data } = await getPostsList();
    setPostList(data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const newPost = useCallback(() => {
    if (!userModel.isLogin) {
      setAlertConf({
        title: '未登录',
        description: '即将为您跳转登录页...',
        type: 'warn'
      });
      setAlertVisible(true);
      setTimeout(() => {
        history.push('/login');
      }, 3000);
      return;
    }
    history.push('/community/newPost');
  }, [history, userModel.isLogin]);

  return (
    <div className="community">
      <h2 className="community-title">社区热帖</h2>
      {alertEl}
      <Button
        size="lg"
        btnType="primary"
        className="community-post-btn"
        onClick={newPost}
      >
        发表主题帖
        <FontAwesomeIcon
          className="community-icon"
          icon={['far', 'plus-square']}
        />
      </Button>
      <ul className="community-post-list">
        {postList.length ? (
          postList.map((post) => (
            <li key={post.id} className="community-post-item">
              <div className="postItem-wrapper">
                <Link className="postItem-title" to={`post/${post.id}`}>
                  {post.title}
                </Link>
                <span className="postItem-creator">{post.creatorUsername}</span>
                <span className="postItem-date">
                  {parseMongoDate(post.createdAt)}
                </span>
                <span className="postItem-date_update">
                  最后更新于 {parseMongoDate(post.updatedAt)}
                </span>
              </div>
              <div className="postItem-replies">{post.repliesNum}</div>
            </li>
          ))
        ) : (
          <Placeholder />
        )}
      </ul>
    </div>
  );
};

export default Community;
