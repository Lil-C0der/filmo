import { IMovieOfUser } from '@/types';
import instance from '@network/request';

export function login(username: string, password: string) {
  return instance<dataTypes.loginResponseData>({
    url: 'local/auth/login',
    method: 'POST',
    data: { username, password }
  });
}

export function register(username: string, password: string) {
  return instance<dataTypes.registerResponseData>({
    url: 'local/auth/register',
    method: 'POST',
    data: { username, password }
  });
}

export function getUserDetail() {
  return instance<dataTypes.userDetailResponseData>({
    url: `local/auth/user`,
    method: 'GET'
  });
}

export function addToList(movie: IMovieOfUser, targetList: 10 | 20) {
  return instance<dataTypes.userDetailResponseData>({
    url: 'local/auth/addToList',
    method: 'POST',
    data: { movie, targetList }
  });
}

export function removeFromList(movie: IMovieOfUser, targetList: 10 | 20) {
  return instance<dataTypes.userDetailResponseData>({
    url: 'local/auth/removeFromList',
    method: 'POST',
    data: { movie, targetList }
  });
}
