import defaultRequest from './defaultRequest';

const authRequest = defaultRequest.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
  },
});

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
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        authRequest
          .post(
            '/reissue',
            {},
            {
              headers: { Refresh: refreshToken },
            }
          )
          .then((res) => {
            localStorage.setItem('AccessToken', res.headers.authorization);
            window.location.reload();
          });
      } else {
        return alert('로그인 후 이용해 주세요');
      }
    }
    return console.log(error);
  }
);

export default authRequest;
