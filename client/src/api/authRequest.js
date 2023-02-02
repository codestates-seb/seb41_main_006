import axios from 'axios';
import defaultRequest from './defaultRequest';

const authRequest = axios.create();

// 모든 요청에 withCredentials가 true로 설정
authRequest.defaults.withCredentials = true;
// post의 content-type을 지정
authRequest.defaults.headers.post['Content-Type'] = 'application/json';
// 서버 API 주소 지정
authRequest.defaults.baseURL = process.env.REACT_APP_SERVER_API;

authRequest.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 헤더에 토큰값 설정
    const AUTH_TOKEN = localStorage.getItem('AccessToken');
    config.headers['Authorization'] = AUTH_TOKEN;

    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    console.log(error);
    return Promise.reject(error);
  }
);

authRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const refreshToken = localStorage.getItem('refreshToken');
    // config는 어떤 요청이었는지에 대한 정보를 담고 있다.
    // const {config, response} = error
    // const { response } = error;
    // if (response?.status === 401) {
    //   const originalRequest = config

    //   401 에러인데 토큰이 만료된 에러라면 -> reissue // 요청했던 거 다시 이어가면 좋을텐디
    //   if(token이 만료된 에러){
    //     reissue
    //   }
    //   401로 요청 실패했던 요청 새로운 accessToken으로 재요청
    //   return axios(originalRequest);
    // }

    if (error.response.data.message) {
      // 토큰 만료 에러일 때 실행
      if (error.response.data.message.includes('JWT expired') && refreshToken) {
        await defaultRequest
          .post(`/auth/reissue`, '', {
            headers: { Refresh: refreshToken },
          })
          .then((res) => {
            localStorage.setItem('AccessToken', res.headers.authorization);
            alert('다시 시도해 주세요');
          })
          .catch((e) => {
            if (e.response.data.message.includes('JWT expired')) {
              localStorage.clear();
              window.location.reload();
              window.location.href = '/';
            }
          });
      }
    }
    if (
      error.response.data === 'FORBIDDEN_ACCESS' ||
      error.response.data === 'NOT_AUTHORIZED'
    ) {
      if (refreshToken) {
        await defaultRequest
          .post(`/auth/reissue`, '', {
            headers: { Refresh: refreshToken },
          })
          .then((res) => {
            localStorage.setItem('AccessToken', res.headers.authorization);
          })
          .catch((e) => {
            if (e.response.data.message.includes('JWT expired')) {
              localStorage.clear();
              window.location.reload();
              window.location.href = '/';
            }
          });
      } else {
        alert('로그인 후 이용해 주세요.');
        window.location.href = '/';
      }
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default authRequest;
