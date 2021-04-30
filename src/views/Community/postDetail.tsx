import React, { FC, useCallback, useEffect, useState } from 'react';
import Placeholder from '@/components/Placeholder';
import { getPostDetail, replyPost } from '@/network/post';
import { parseMongoDate, parseTimeStamp } from '@/utils';
import { useParams } from 'react-router';
import BraftEditor, { ControlType, EditorState } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { Button } from 'woo-ui-react';

import 'braft-editor/dist/index.css';
import Alert, { IAlertProps } from 'woo-ui-react/dist/components/Alert/alert';
import { IPostDetail } from '@/types';

import styles from './_styles.module.scss';

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

enum POST_ALERT_MSG {
  NOT_EMPTY = '回帖内容不能为空！',
  UNAUTH = '请先登录！'
}

const PostDetail: FC = () => {
  const { postId } = useParams<IPostParams>();
  const [postDetail, setPostDetail] = useState<IPostDetail>();
  const [editorState, setEditorState] = useState<EditorState>(
    BraftEditor.createEditorState(null)
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConf, setAlertConf] = useState<IAlertProps>({
    title: '',
    description: '',
    type: 'primary'
  });

  const fetchPostDetail = useCallback(async () => {
    const { data } = await getPostDetail(postId);
    setPostDetail(data);
  }, [postId]);

  const onReply = useCallback(async () => {
    const content: string = editorState.toText();
    if (!content.trim()) {
      setAlertConf({
        title: POST_ALERT_MSG.NOT_EMPTY,
        type: 'danger'
      });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1000);
      return;
    }

    try {
      const { code, data, msg } = await replyPost(postId, content);
      if (code === 200) {
        // 发表后清空
        setEditorState(ContentUtils.clear(editorState));
        setPostDetail(data);
        setAlertConf({
          title: msg,
          type: 'success'
        });
      }
    } catch (error) {
      setAlertConf({
        title: POST_ALERT_MSG.UNAUTH,
        type: 'danger'
      });
    }

    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 1000);
  }, [postId, editorState]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  let alertEl = alertVisible ? (
    <Alert
      closable
      className={styles['post-alert']}
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

  return (
    <div className={styles.post}>
      {alertEl}
      <div className={styles['post-wrapper']}>
        <div className={styles['post-header']}>
          <h1 className={styles['post-title']}>{postDetail?.title}</h1>
          <div className={styles['post-info']}>
            <span className={styles['post-creator']}>
              {postDetail?.creatorUsername}
            </span>
            <span className={styles['post-date']}>
              发表于 {parseMongoDate(postDetail?.createdAt || '')} +8:00
            </span>
          </div>
        </div>
        <div className={styles['post-content']}>{postDetail?.content}</div>
      </div>

      <div className={styles['post-replies-wrapper']}>
        {postDetail?.replies.length ? (
          postDetail?.replies.map((reply, index) => (
            <div className={styles['post-reply']} key={index}>
              <span className={styles['reply-index']}>{index + 1} 楼</span>
              <span className={styles['reply-creator']}>{reply.username}</span>
              <span className={styles['reply-date']}>
                {parseTimeStamp(reply.replyAt)}
              </span>
              <p className={styles['reply-content']}>{reply.content}</p>
            </div>
          ))
        ) : (
          <Placeholder />
        )}
      </div>

      <BraftEditor
        style={{ height: '240px' }}
        className={styles['post-reply-editor']}
        value={editorState}
        controls={editorControls}
        onChange={setEditorState}
      />
      <Button
        className={styles['reply-btn']}
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
