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

export enum ListSource {
  collectionList = 10,
  watchedList = 20
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
      addToList: action.bound
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

  addToList(
    movie: IMovieOfUser,
    source: ListSource.collectionList | ListSource.watchedList
  ) {
    if (source === ListSource.collectionList) {
      const ids = this.user.collectionList.map((m) => m.id);
      if (!ids.includes(movie.id)) {
        console.log('pushing');

        this.user.collectionList.push(movie);
      }
    }
    if (source === ListSource.watchedList) {
      const ids = this.user.watchedList.map((m) => m.id);
      if (!ids.includes(movie.id)) {
        console.log('pushing watchedList');

        this.user.watchedList.push(movie);
      }
    }
  }

  removeFromCollection(
    id: number,
    source: ListSource.collectionList | ListSource.watchedList
  ) {
    if (source === ListSource.collectionList) {
      const ids = this.user.collectionList.map((m) => m.id);
      const idx = ids.indexOf(id);
      if (idx >= 0) {
        this.user.collectionList.splice(idx, 1);
      }
    }

    if (source === ListSource.watchedList) {
      const ids = this.user.watchedList.map((m) => m.id);
      const idx = ids.indexOf(id);
      if (idx >= 0) {
        this.user.watchedList.splice(idx, 1);
      }
    }
  }
}

const userModel = new UserModel();
export default userModel;
