import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-3-39-12-49.ap-northeast-2.compute.amazonaws.com:8080/',
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
  async function (error) {
    /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.    
  */
    if (error?.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await axios
          .post(
            `${process.env.REACT_APP_SERVER_API}auth/reissue`,
            {},
            {
              headers: { Refresh: refreshToken },
            }
          )
          .then((res) => {
            localStorage.setItem('AccessToken', res.headers.authorization);
            window.location.reload();
          })
          .catch((error) => {
            if (error.response.status === 401) {
              localStorage.removeItem('AccessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('memberId');
              alert('다시 로그인 해 주세요');
              window.location.reload();
            }
          });
      } else if (error.code === 'ERR_BAD_REQUEST') {
        alert('이메일과 비밀 번호를 정확히 입력해 주세요');
      } else {
        alert('로그인 후 이용해 주세요');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
