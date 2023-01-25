import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-3-39-12-49.ap-northeast-2.compute.amazonaws.com:8080',
  timeout: 1000,
});

instance.interceptors.response.use(
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
        instance
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

export default instance;
