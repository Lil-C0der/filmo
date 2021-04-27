import instance from '@network/request';

export function login(username: string, password: string) {
  return instance<dataTypes.loginResponseData>({
    url: '/local/auth/login',
    method: 'POST',
    data: { username, password }
  });
}

export function register(username: string, password: string) {
  return instance<dataTypes.registerResponseData>({
    url: '/local/auth/register',
    method: 'POST',
    data: { username, password }
  });
}

export function getUserDetail() {
  return instance<dataTypes.userDetailResponseData>({
    url: `/local/auth/user`,
    method: 'GET'
  });
}
