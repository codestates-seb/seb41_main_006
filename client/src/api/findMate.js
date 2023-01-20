// import axios from 'axios';

// api url
// export const FINDMATE_ENDPOINT =
//   process.env.REACT_APP_API + process.env.REACT_APP_API_FINDMATE_BOARD_ENDPOINT;

// const API_CONNECT_TIMEOUT = 2000;

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
