import { getPostsList } from '@/network/post';
import { mongoDataParser } from '@/utils';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './_styles.scss';

const Community: FC = () => {
  const [postList, setPostList] = useState<dataTypes.IPost[]>([]);

  const fetchPosts = async () => {
    const { data } = await getPostsList();
    setPostList(data.posts);
  };

  const placeholderEl = (
    <div className="profile-placeholder">暂时还没有内容~</div>
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="community">
      <h2 className="community-title">社区热帖</h2>
      <ul className="community-post-list">
        {postList.length
          ? postList.map((post) => (
              <li key={post.id} className="community-post-item">
                <div className="post-wrapper">
                  <Link className="post-title" to={`post/${post.id}`}>
                    {post.title}
                  </Link>
                  <span className="post-username">{post.creatorUsername}</span>
                  <span className="post-date">
                    {mongoDataParser(post.createdAt)}
                  </span>
                </div>
                <div className="post-replies">{post.replies}</div>
              </li>
            ))
          : placeholderEl}
      </ul>
    </div>
  );
};

export default Community;
