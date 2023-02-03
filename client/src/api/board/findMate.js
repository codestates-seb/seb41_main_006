import authRequest from '../authRequest';
import defaultRequest from '../defaultRequest';
// api url
export const FINDMATE_ENDPOINT =
  process.env.REACT_APP_API_FINDMATE_BOARD_ENDPOINT;

const API_CONNECT_TIMEOUT = 2000;

// 글 불러오기
export const boardGetById = async (boardId) => {
  if (boardId) {
    const path = `${FINDMATE_ENDPOINT}/${boardId}`;
    try {
      const res = await defaultRequest.get(path);
      return res?.data?.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};

// 글 생성
export const boardCreate = async (body) => {
  try {
    const res = await authRequest.post(FINDMATE_ENDPOINT, body, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return res.data.data;
  } catch (err) {
    console.error('Error: ', err);
    return { state: 'error ' };
  }
};

// 글 수정
export const boardPatch = async ({ boardId, body }) => {
  const path = `${FINDMATE_ENDPOINT}/${boardId}`;

  try {
    const res = await authRequest.patch(path, body, {
      timeout: API_CONNECT_TIMEOUT,
    });
    return res.data.data;
  } catch (err) {
    console.error('Error: ', err);
    return { statusText: 'error ' };
  }
};

// 글 삭제
export const boardDelete = async (boardId) => {
  const path = `${FINDMATE_ENDPOINT}/${boardId}`;

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

// 글 좋아요 & 좋아요 취소
export const boardLike = async ({ boardId, body }) => {
  const path = `${FINDMATE_ENDPOINT}/${boardId}/like`;

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
