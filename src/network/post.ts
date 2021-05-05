import instance from './request';

export const getPostsList = () => {
  return instance<dataTypes.postsResponseData>({
    url: 'local/posts',
    method: 'GET'
  });
};

export const getPostDetail = (id: string) => {
  return instance<dataTypes.postDetailResponseData>({
    url: `local/posts/${id}`,
    method: 'GET'
  });
};

export const createNewPost = ({
  title,
  content
}: {
  title: string;
  content: string;
}) => {
  return instance<dataTypes.postDetailResponseData>({
    url: `local/posts`,
    method: 'POST',
    data: { title, content }
  });
};

export const replyPost = (
  id: string,
  content: string,
  replyAt: number = Date.now()
) => {
  // 带上时间戳
  return instance<dataTypes.postDetailResponseData>({
    url: `local/posts/${id}`,
    method: 'PUT',
    data: { content, replyAt }
  });
};
