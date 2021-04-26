import instance from './request';

export const getPostsList = () => {
  return instance<dataTypes.postsResponseData>({
    url: '/local/posts',
    method: 'GET'
  });
};

export const getPostDetail = (id: string) => {
  return instance<dataTypes.postDetailResponseData>({
    url: `/local/posts/${id}`,
    method: 'GET'
  });
};
