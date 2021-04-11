import instance from '@network/request';

export function login(username: string, pwd: string) {
  return instance({
    url: '/local/posts',
    method: 'GET'
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
