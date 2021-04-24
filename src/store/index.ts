import { action, makeObservable, observable } from 'mobx';

interface IUser {
  username: string;
  token: string;
  createdAt: string;
  favoritesList: any[];
  watchedList: any[];
  posts: any[];
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

  user: IUser;
  isLogin: boolean;
  constructor() {
    this.user = defaultUser;
    this.isLogin = false;

    makeObservable(this, {
      user: observable,
      isLogin: observable,
      login: action.bound,
      logout: action.bound
    });
  }

  private initUser(userInfo?: IUser) {
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
      return;
    }
    this.user = defaultUser;
  }

  login(userInfo: IUser) {
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
