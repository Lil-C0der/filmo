import { IPost } from '@/types';
import { action, makeObservable, observable } from 'mobx';

export interface IUserWithToken {
  username: string;
  token: string;
  createdAt: string;
  favoritesList: any[];
  watchedList: any[];
  posts: IPost[];
}

const defaultUser = {
  username: '',
  token: '',
  createdAt: '',
  favoritesList: [],
  posts: [],
  watchedList: []
};

class UserModel {
  // @observable
  // isLogin: boolean = false;

  // @observable
  // user: IUser = {
  //   username: '',
  //   token: ''
  // };

  // @action

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
      logout: action.bound
    });
  }

  private initUser(userInfo?: IUserWithToken) {
    //  this.user =  {
    //     username: '',
    //     token: '',
    //     createdAt: '',
    //     favoritesList: [],
    //     posts: [],
    //     watchedList: []
    //   }

    if (userInfo) {
      this.user = userInfo;
      this.token = userInfo.token;
      return;
    }
    this.user = defaultUser;
  }

  login(userInfo: IUserWithToken) {
    this.initUser(userInfo);
    this.isLogin = true;
  }

  logout() {
    this.initUser();
    this.isLogin = false;
  }
}

const userModel = new UserModel();
export default userModel;
