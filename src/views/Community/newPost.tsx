import React, { FC, useCallback, useState } from 'react';
import store from '@/store';
import { observer, useLocalStore } from 'mobx-react-lite';
import Alert, { IAlertProps } from 'woo-ui-react/dist/components/Alert/alert';
import { useHistory } from 'react-router-dom';
import BraftEditor, { ControlType, EditorState } from 'braft-editor';
import Input from '@/components/Input';
import { Button } from 'woo-ui-react';
import { createNewPost } from '@/network/post';
import { useSubmit } from '@/hooks';

import styles from './_styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  NOT_EMPTY = '帖子标题不能为空！',
  UNAUTH = '请先登录！'
}

const newPost: FC = observer(() => {
  const userModel = useLocalStore(() => store);
  const history = useHistory();
  const [alertConf, setAlertConf] = useState<IAlertProps>({
    title: '',
    description: '',
    type: 'primary'
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const [editorState, setEditorState] = useState<EditorState>(
    BraftEditor.createEditorState(null)
  );
  const [titleVal, setTitleVal] = useState('');

  const { executor: createNewPostExecutor, isRunning } = useSubmit(
    createNewPost
  );

  const onSubmit = useCallback(async () => {
    const title = titleVal;
    const content: string = editorState.toText();

    if (!userModel.isLogin) {
      setAlertConf({
        title: POST_ALERT_MSG.UNAUTH,
        type: 'danger'
      });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }

    if (!title.trim()) {
      setAlertConf({
        title: POST_ALERT_MSG.NOT_EMPTY,
        type: 'danger'
      });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }

    try {
      // const { data, msg, code } = await createNewPost({ title, content });
      const { data, msg, code } = await (
        await createNewPostExecutor({ title, content })
      ).res;
      if (code === 200) {
        setAlertConf({
          title: msg,
          type: 'success'
        });
        history.push(`/post/${data.id}`);
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
    }, 3000);
  }, [
    titleVal,
    editorState,
    userModel.isLogin,
    createNewPostExecutor,
    history
  ]);

  let alertEl = alertVisible ? (
    <Alert
      closable
      className={styles['newPost-alert']}
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
    <div className={styles.newPost}>
      {alertEl}
      <h2 className={styles['newPost-title']}>
        发表主题帖
        {isRunning ? (
          <FontAwesomeIcon
            style={{ marginLeft: '4px' }}
            icon="spinner"
            spin={isRunning}
          />
        ) : null}
      </h2>
      <div className={styles['newPost-editor_wrapper']}>
        <Input
          className={styles['newPost-editor_title']}
          placeholder="请输入标题"
          value={titleVal}
          onChange={setTitleVal}
        />
        <BraftEditor
          style={{ height: '240px' }}
          contentStyle={{ height: '200px' }}
          className={styles['newPost-editor_content']}
          value={editorState}
          controls={editorControls}
          onChange={setEditorState}
        />
      </div>
      <Button className={styles['newPost-btn']} size="lg" onClick={onSubmit}>
        发表
      </Button>
    </div>
  );
});

export default newPost;
