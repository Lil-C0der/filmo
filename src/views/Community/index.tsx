import { getPostsList } from '@/network/post';
import { parseMongoDate } from '@/utils';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Placeholder from '@/components/Placeholder';

import './_styles.scss';

const Community: FC = () => {
  const [postList, setPostList] = useState<dataTypes.IPost[]>([]);

  const fetchPosts = async () => {
    const { data } = await getPostsList();
    setPostList(data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="community">
      <h2 className="community-title">社区热帖</h2>
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
                <span className="postItem-date">
                  最后更新于 {parseMongoDate(post.updatedAt)}
                </span>
              </div>
              <div className="postItem-replies">{post.replies}</div>
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
