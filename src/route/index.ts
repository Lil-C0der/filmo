import Home from '@/views/Home';
import Detail from '@/views/Detail';
import Cast from '@/views/Cast';
import Login from '@/views/Login';
import Profile from '@/views/Profile';
import { FC } from 'react';
import News from '@/views/News';

export interface IRouteCfg {
  name: string;
  path: string;
  component: FC;
  exact: boolean;
  auth?: boolean;
}

const routes: IRouteCfg[] = [
  { name: 'home', path: '/', component: Home, exact: true },
  { name: 'detail', path: '/detail/:id', component: Detail, exact: false },
  { name: 'cast', path: '/cast/:id', component: Cast, exact: false },
  { name: 'login', path: '/login', component: Login, exact: false },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    auth: true,
    exact: false
  },
  { name: 'news', path: '/news/:newsType', component: News, exact: false }
];

export default routes;
