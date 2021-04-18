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

export function getUserDetail(id: number | string) {
  return instance({
    url: `/local/posts/${id}`,
    method: 'GET'
  });
}
