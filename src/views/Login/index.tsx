import React, { FC } from 'react';
import { Button } from 'woo-ui-react';
import Input from '@/components/Input';
import './_style.scss';

const Login: FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };

  const onReset = () => {
    console.log('reset');
  };

  return (
    <div className="login">
      <div className="login-modal">
        <h2 className="login-modal_title">登录</h2>

        <div className="login-modal_content">
          <div className="login-modal_row login-username">
            <p className="login-modal_label">用户名</p>
            <Input></Input>
          </div>

          <div className="login-modal_row login-password">
            <p className="login-modal_label">密码</p>
            <Input></Input>
          </div>
        </div>

        {/* TODO 按钮点击回调 */}
        <div className="login-modal_btns">
          <Button
            btnType="primary"
            className="login-modal_btn"
            onClick={onSubmit}
          >
            登录
          </Button>
          <Button className="login-modal_btn" onClick={onReset}>
            重置
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
