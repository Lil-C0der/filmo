import Placeholder from '@/components/Placeholder';
import { getPostDetail } from '@/network/post';
import { parseMongoDate, parseTimeStamp } from '@/utils';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface IPostParams {
  postId: string;
}

const PostDetail: FC = () => {
  const { postId } = useParams<IPostParams>();
  const [postDetail, setPostDetail] = useState<dataTypes.IPostDetail>();

  const fetchPostDetail = useCallback(async () => {
    const { data } = await getPostDetail(postId);
    console.log(data);
    setPostDetail(data);
  }, [postId]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-header">
          <h1 className="post-title">{postDetail?.title}</h1>
          <div className="post-info">
            <span className="post-creator">{postDetail?.creatorUsername}</span>
            <span className="post-date">
              发表于 {parseMongoDate(postDetail?.createdAt || '')} +8:00
            </span>
          </div>
        </div>
        <div className="post-content">{postDetail?.content}</div>
      </div>

      <div className="post-replies-wrapper">
        {postDetail?.replies.length ? (
          postDetail?.replies.map((reply) => (
            <div className="post-reply">
              <span className="reply-username">{reply.username}</span>
              <span className="reply-date">
                {parseTimeStamp(reply.replyAt)}
              </span>
              <p className="reply-content">{reply.content}</p>
            </div>
          ))
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};

export default PostDetail;
