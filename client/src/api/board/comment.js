import axios from 'axios';
import { getLoginInfo } from '../loginInfo';

// api url
export const COMMENT_ENDPOINT =
  process.env.REACT_APP_API + process.env.REACT_APP_API_COMMENT_ENDPOINT;

const API_CONNECT_TIMEOUT = 2000;

// 댓글 생성
export const commentCreate = async (body) => {
  const { AccessToken } = getLoginInfo();
  console.log(body);
  try {
    let result = await axios.post(COMMENT_ENDPOINT, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AccessToken,
      },
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', data: result.data.response };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 댓글 수정
export const commentPatch = async (commentId, body) => {
  const { AccessToken } = getLoginInfo();
  const path = `${COMMENT_ENDPOINT}/${commentId}`;
  console.log(path);
  console.log(body);

  try {
    let result = await axios.patch(path, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AccessToken,
      },
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
  const { AccessToken } = getLoginInfo();
  const path = `${COMMENT_ENDPOINT}/${commentId}`;
  console.log(commentId);

  try {
    let result = await axios.delete(path, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AccessToken,
      },
      timeout: API_CONNECT_TIMEOUT,
    });
    console.log(result);
    return { state: 'OK', msg: result.data };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 대댓글 생성
export const recommentCreate = async (boardId, body) => {
  // const { token } = getLoginInfo();
  const path = `${COMMENT_ENDPOINT}/${boardId}`;

  try {
    let result = await axios.post(path, body, {
      headers: {
        'Content-Type': 'application/json',
        //Authorization: token,
      },
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', data: result.data.response };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};
