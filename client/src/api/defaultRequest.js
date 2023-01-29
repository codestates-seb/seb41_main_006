import axios from 'axios';

const defaultRequest = axios.create();

// 모든 요청에 withCredentials가 true로 설정
defaultRequest.defaults.withCredentials = true;
// post의 content-type을 지정
defaultRequest.defaults.headers.post['Content-Type'] = 'application/json';
// 서버 API 주소 지정
defaultRequest.defaults.baseURL = process.env.REACT_APP_SERVER_API;

defaultRequest.interceptors.response.use(
  (response) => {
    /* http status가 200인 경우 응답 성공 직전 호출*/
    return response;
  },

  (error) => {
    /* http status가 200이 아닌 경우 응답 에러 직전 호출*/
    // 에러를 로그
    console.log(error);

    /* catch로 이어짐 */
    return Promise.reject(error);
  }
);

export default defaultRequest;
