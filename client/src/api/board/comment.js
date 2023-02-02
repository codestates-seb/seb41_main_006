import authRequest from '../authRequest';

// api url
export const COMMENT_ENDPOINT = process.env.REACT_APP_API_COMMENT_ENDPOINT;

const API_CONNECT_TIMEOUT = 2000;

// 댓글 생성
export const commentCreate = async (body) => {
  try {
    let result = await authRequest.post(COMMENT_ENDPOINT, body, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', data: result.data.response };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 댓글 수정
export const commentPatch = async ({ commentId, body }) => {
  const path = `${COMMENT_ENDPOINT}/${commentId}`;

  try {
    let result = await authRequest.patch(path, body, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', data: result.data.response };
  } catch (err) {
    console.error('Error: ', err);
    return { statusText: 'error ' };
  }
};

// 댓글 삭제
export const commentDelete = async (commentId) => {
  const path = `${COMMENT_ENDPOINT}/parent/${commentId}`;

  try {
    let result = await authRequest.delete(path, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', msg: result.data };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 대댓글 생성
export const recommentCreate = async (parentId, body) => {
  const path = `${COMMENT_ENDPOINT}/${parentId}`;

  try {
    let result = await authRequest.post(path, body, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', data: result.data.response };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 대댓글 삭제
export const recommentDelete = async (commentId) => {
  const path = `${COMMENT_ENDPOINT}/reply/${commentId}`;

  try {
    let result = await authRequest.delete(path, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', data: result.data.response };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 댓글 좋아요 & 좋아요 취소
export const commentLike = async (commentId, body) => {
  const path = `${COMMENT_ENDPOINT}/${commentId}/like`;

  try {
    let result = await authRequest.post(path, body, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', msg: result.data };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};
