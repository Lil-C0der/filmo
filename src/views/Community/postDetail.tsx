import Placeholder from '@/components/Placeholder';
import { getPostDetail } from '@/network/post';
import { parseMongoDate, parseTimeStamp } from '@/utils';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'braft-editor/dist/index.css';
import BraftEditor, { ControlType } from 'braft-editor';
import { Button } from 'woo-ui-react';

interface IPostParams {
  postId: string;
}

const editorControls: ControlType[] = [
  'undo',
  {
    key: 'redo', // 使用key来指定控件类型
    title: '恢复' // 自定义控件title
  },
  'separator',
  {
    key: 'emoji',
    title: 'emoji'
    // text: 'emoji'
  },
  'separator',
  {
    key: 'clear',
    text: '清空'
  }
];

const PostDetail: FC = () => {
  const { postId } = useParams<IPostParams>();
  const [postDetail, setPostDetail] = useState<dataTypes.IPostDetail>();
  const [editorState, setEditorState] = useState();

  const fetchPostDetail = useCallback(async () => {
    const { data } = await getPostDetail(postId);
    console.log(data);
    setPostDetail(data);
  }, [postId]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  const handleChange = (e: any) => {
    console.log(e);
  };

  const onReply = () => {
    console.log(editorState);
  };

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
          postDetail?.replies.map((reply, index) => (
            <div className="post-reply" key={index}>
              <span className="reply-index">{index + 1} 楼</span>
              <span className="reply-creator">{reply.username}</span>
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

      <BraftEditor
        style={{ height: '400px' }}
        className="post-reply-editor"
        value={editorState}
        controls={editorControls}
        onChange={handleChange}
      />
      <Button
        className="reply-btn"
        size="lg"
        btnType="primary"
        onClick={onReply}
      >
        回复
      </Button>
    </div>
  );
};

export default PostDetail;
