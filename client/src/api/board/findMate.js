import axios from 'axios';
import { getLoginInfo } from '../loginInfo';

// api url
export const FINDMATE_ENDPOINT =
  process.env.REACT_APP_SERVER_API +
  process.env.REACT_APP_API_FINDMATE_BOARD_ENDPOINT;

const API_CONNECT_TIMEOUT = 2000;

// 글 생성
export const boardCreate = async (body) => {
  const { AccessToken } = getLoginInfo();

  try {
    let result = await axios.post(FINDMATE_ENDPOINT, body, {
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

// 글 수정
export const boardPatch = async (boardId, body) => {
  const { AccessToken } = getLoginInfo();
  const path = `${FINDMATE_ENDPOINT}/${boardId}`;

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

// 글 삭제
export const boardDelete = async (boardId) => {
  const { AccessToken } = getLoginInfo();
  const path = `${FINDMATE_ENDPOINT}/${boardId}`;

  try {
    let result = await axios.delete(path, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AccessToken,
      },
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', msg: result.data };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 글 좋아요 & 좋아요 취소
export const boardLike = async (boardId, body) => {
  const { AccessToken } = getLoginInfo();
  const path = `${FINDMATE_ENDPOINT}/${boardId}/like`;

  try {
    let result = await axios.post(path, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AccessToken,
      },
      timeout: API_CONNECT_TIMEOUT,
    });
    return { state: 'OK', msg: result.data };
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};
