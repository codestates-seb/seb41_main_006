import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
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
            `${process.env.REACT_APP_SERVER_API}/auth/reissue`,
            {},
            {
              headers: { Refresh: refreshToken },
            }
          )
          .then((res) => {
            localStorage.setItem('AccessToken', res.headers.authorization);
            window.location.reload();
          });
      }
      if (
        error.response.data.message === 'Member Not Found' ||
        error.response.data.message === '자격 증명에 실패하였습니다.'
      ) {
        alert('이메일과 비밀 번호를 정확히 입력해 주세요');
      } else {
        alert('로그인 후 이용해 주세요');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
