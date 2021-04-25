import instance from './request';

export const getPostsList = () => {
  return instance<dataTypes.postsResponseData>({
    url: '/local/posts',
    method: 'GET'
  });
};
