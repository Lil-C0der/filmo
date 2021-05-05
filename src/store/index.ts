import { IMovieOfUser, IPost } from '@/types';
import { action, makeObservable, observable, toJS } from 'mobx';

export interface IUserWithToken {
  username: string;
  token: string;
  createdAt: string;
  collectionList: IMovieOfUser[];
  watchedList: IMovieOfUser[];
  posts: IPost[];
}

const defaultUser = {
  username: '',
  token: '',
  createdAt: '',
  collectionList: [],
  posts: [],
  watchedList: []
};

class UserModel {
  user: IUserWithToken;
  isLogin: boolean;
  token: string;
  constructor() {
    this.user = defaultUser;
    this.token = '';
    // this.isLogin = !!localStorage.getItem('user-token');
    this.isLogin = false;

    makeObservable(this, {
      user: observable,
      isLogin: observable,
      login: action.bound,
      logout: action.bound,
      addToCollection: action.bound
    });
  }

  private initUser(userInfo?: IUserWithToken) {
    //  this.user =  {
    //     username: '',
    //     token: '',
    //     createdAt: '',
    //     collectionList: [],
    //     posts: [],
    //     watchedList: []
    //   }

    if (userInfo) {
      this.user = userInfo;
      this.token = userInfo.token;
      return;
    } else {
    }
    this.user = defaultUser;
  }

  login(userInfo: IUserWithToken) {
    this.initUser(userInfo);
    this.isLogin = true;
    console.log('store collection', toJS(this.user.collectionList));
  }

  logout() {
    this.initUser();
    this.isLogin = false;
  }

  addToCollection(movie: IMovieOfUser) {
    const ids = this.user.collectionList.map((m) => m.id);
    if (!ids.includes(movie.id)) {
      console.log('pushing');

      this.user.collectionList.push(movie);
    }
  }
}

const userModel = new UserModel();
export default userModel;
