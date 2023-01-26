import axios from 'axios';
import { getLoginInfo } from '../loginInfo';

// api url
export const FINDMATE_ENDPOINT =
  process.env.REACT_APP_SERVER_API +
  process.env.REACT_APP_API_FINDMATE_BOARD_ENDPOINT;

const API_CONNECT_TIMEOUT = 2000;

// 메이트 찾기 - 모임 목록 조회
// export const findMateGet = async (bCode) => {
//   console.log(bCode);
//   const params = { search: bCode };
//   try {
//     let result = await axios.get(FINDMATE_ENDPOINT, {
//       params: params,
//       headers: {
//         'Content-Type': 'application/json',
//       },

//       timeout: API_CONNECT_TIMEOUT,
//     });
//     console.log(result);
//     return { state: 'OK', data: result.data.response };
//   } catch (err) {
//     console.error('Error: ', err);
//     return { state: 'error' };
//   }
// };

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
    console.log(result);
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

/*
export const boardGet = async (boardId) => {
  const { AccessToken } = getLoginInfo();
  const path = `${FINDMATE_ENDPOINT}/${boardId}`;

  try {
    let result = await axios.get(path, {
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
*/
