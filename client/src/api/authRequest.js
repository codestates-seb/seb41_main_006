import defaultRequest from './defaultRequest';

const authRequest = defaultRequest.create();

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
    /*
      http status가 200인 경우
      응답 바로 직전에 대해 작성합니다. 
      .then() 으로 이어집니다.
  */
    return response;
  },
  function (error) {
    /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.    
  */
    // if (error?.response?.status === 401) {
    //   const refreshToken = localStorage.getItem('refreshToken');
    //   if (refreshToken) {
    //     defaultRequest
    //       .post(
    //         '/auth/reissue',
    //         {},
    //         {
    //           headers: { Refresh: refreshToken },
    //         }
    //       )
    //       .then((res) => {
    //         localStorage.setItem('AccessToken', res.headers.authorization);
    //         window.location.reload();
    //       })
    //       .catch((error) => {
    //         if (error?.response?.status === 401) {
    //           localStorage.removeItem('AccessToken');
    //           localStorage.removeItem('refreshToken');
    //           alert('다시 로그인 해 주세요');
    //           window.location.reload();
    //         }
    //       });
    //   } else {
    //     return alert('로그인 후 이용해 주세요');
    //   }
    // }
    return console.log(error);
  }
);

export default authRequest;
