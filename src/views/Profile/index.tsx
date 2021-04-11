import React, { FC, useEffect } from 'react';
import { create, login, getUserDetail } from '@/network/users';
import { useHistory } from 'react-router';

const getUsr = async () => {
  // const res = await create('alex', '123');
  const res = await getUserDetail('123');
  console.log(res);
};

const Profile: FC = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      history.push('/login');
      console.log('未登录');
    }
  }, [history]);
  useEffect(() => {
    getUsr();
  }, []);

  return <div>"PROFILE"</div>;
};

export default Profile;
