import instance from '@network/request';

export function login(username: string, password: string) {
  return instance<dataTypes.loginResponseData>({
    url: '/local/auth/login',
    method: 'POST',
    data: { username, password }
  });
}

export function create(username: string, pwd: string) {
  return instance({
    url: '/local/posts',
    method: 'POST'
  });
}

export function getUserDetail(token: string) {
  return instance<dataTypes.userDetailResponseData>({
    url: `/local/auth/user`,
    method: 'GET',
    headers: {
      // token
      Authorization: `Bearer ${token}`
    }
  });
}
