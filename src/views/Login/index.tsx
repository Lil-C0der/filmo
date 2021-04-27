import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Button } from 'woo-ui-react';
import Input from '@/components/Input';
import { login, register } from '@/network/users';
import { getCurrGreeting } from '@/utils';
import { IAlertProps } from 'woo-ui-react/dist/components/Alert/alert';
import logo from '../../logo.png';

import { observer, useLocalStore } from 'mobx-react-lite';
import store from '@store/index';
import { useHistory } from 'react-router-dom';

import './_style.scss';

enum LOGIN_ALERT_MSG {
  TITLE = '请重试',
  DESCRIPTION = '输入项不能为空！',
  DIFF_PWD_DESCRIPTION = '两次输入的密码不一致！'
}

const Login: FC = observer(() => {
  const history = useHistory();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [usernameVal, setUsernameVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [passwordVal2, setPasswordVal2] = useState('');
  // Alert 组件的配置
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConf, setAlertConf] = useState<IAlertProps>({
    title: '',
    description: '',
    type: 'primary'
  });

  // mobx store
  const loginUserModel = useLocalStore(() => store);

  useEffect(() => {
    setUsernameVal('');
    setPasswordVal('');
    setPasswordVal2('');
  }, [isRegister]);

  // 验证登录和注册的输入项
  const checkInputValidate = useCallback(
    () =>
      passwordVal2
        ? passwordVal2 && passwordVal && usernameVal
        : usernameVal && passwordVal,
    [passwordVal, passwordVal2, usernameVal]
  );

  const onLogin = useCallback(async () => {
    if (!checkInputValidate()) {
      setAlertConf({
        title: LOGIN_ALERT_MSG.TITLE,
        description: LOGIN_ALERT_MSG.DESCRIPTION,
        type: 'danger'
      });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }

    const { code, data, msg } = await login(usernameVal, passwordVal);
    if (code === 200) {
      const { token, user } = data;
      loginUserModel.login({ ...user, token });
      localStorage.setItem('user-token', token);
      setAlertConf({
        title: msg,
        description: `${getCurrGreeting()}，${
          data.user.username
        }，即将为您跳转个人中心...`!,
        type: 'success'
      });
      setTimeout(() => {
        history.push('/profile');
      }, 3000);
    } else {
      setAlertConf({
        title: msg,
        description: data.error!,
        type: 'danger'
      });
    }
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  }, [checkInputValidate, history, loginUserModel, passwordVal, usernameVal]);

  const onRegister = useCallback(() => {
    setIsRegister(true);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!checkInputValidate()) {
      setAlertConf({
        title: LOGIN_ALERT_MSG.TITLE,
        description: LOGIN_ALERT_MSG.DESCRIPTION,
        type: 'danger'
      });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }

    if (passwordVal !== passwordVal2) {
      setAlertConf({
        title: LOGIN_ALERT_MSG.TITLE,
        description: LOGIN_ALERT_MSG.DIFF_PWD_DESCRIPTION,
        type: 'danger'
      });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }

    const { data, code, msg } = await register(usernameVal, passwordVal);
    if (code === 200) {
      setAlertConf({
        title: msg,
        type: 'success'
      });
    } else {
      setAlertConf({
        title: msg,
        description: data.error!,
        type: 'danger'
      });
    }

    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
    return;
  }, [checkInputValidate, passwordVal, passwordVal2, usernameVal]);

  const clearInput = useCallback(() => {
    setUsernameVal('');
    setPasswordVal('');
  }, []);

  const loginEl = (
    <div className="login-modal_content">
      <div className="login-modal_row login-username">
        <p className="login-modal_label">用户名</p>
        <Input
          placeholder="请输入用户名"
          password={false}
          showClear={true}
          onClear={clearInput}
          value={usernameVal}
          onChange={setUsernameVal}
        />
      </div>

      <div className="login-modal_row login-password">
        <p className="login-modal_label">密码</p>
        <Input
          placeholder="请输入密码"
          value={passwordVal}
          onChange={setPasswordVal}
          password
        />
      </div>
    </div>
  );

  const ResgiterEl = (
    <div className="login-modal_content">
      <div className="login-modal_row login-username">
        <p className="login-modal_label">用户名</p>
        <Input
          placeholder="请输入用户名"
          showClear={true}
          onClear={clearInput}
          value={usernameVal}
          onChange={setUsernameVal}
        />
      </div>

      <div className="login-modal_row login-password">
        <p className="login-modal_label">密码</p>
        <Input
          placeholder="请输入密码"
          value={passwordVal}
          onChange={setPasswordVal}
          password
        />
      </div>

      <div className="login-modal_row login-password">
        <p className="login-modal_label">再次输入</p>
        <Input
          placeholder="请再次输入密码"
          value={passwordVal2}
          onChange={setPasswordVal2}
          password
        />
      </div>
    </div>
  );

  let alertEl = alertVisible ? (
    <div>
      <Alert
        closable
        className="login-alert"
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
    </div>
  ) : null;

  return (
    <div className="login">
      {alertEl}

      <div className="login-modal">
        <img src={logo} alt="" className="login-modal_logo" />
        <h2 className="login-modal_title">{isRegister ? '注册' : '登录'}</h2>

        {isRegister ? ResgiterEl : loginEl}

        {/* TODO 按钮点击回调 */}
        <div className="login-modal_btns">
          {isRegister ? null : (
            <Button
              btnType="primary"
              className="login-modal_btn"
              onClick={onLogin}
            >
              登录
            </Button>
          )}

          <Button
            className="login-modal_btn"
            onClick={isRegister ? onSubmit : onRegister}
          >
            {isRegister ? '确定' : '注册'}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Login;
