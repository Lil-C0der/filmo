import Home from '@/views/Home';
import Detail from '@/views/Detail';
import Cast from '@/views/Cast';
import Login from '@/views/Login';
import Profile from '@/views/Profile';
import { FC } from 'react';
import News from '@/views/News';
import Community from '@/views/Community';
import PostDetail from '@/views/Community/postDetail';
import newPost from '@/views/Community/newPost';

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
  { name: 'news', path: '/news/:newsType', component: News, exact: false },
  {
    name: 'newPost',
    path: '/community/newPost',
    component: newPost,
    exact: false
  },
  { name: 'community', path: '/community', component: Community, exact: false },
  {
    name: 'postDetail',
    path: '/post/:postId',
    component: PostDetail,
    exact: false
  }
];

export default routes;
