import axios from 'axios';

// 모든 요청에 withCredentials가 true로 설정
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const instance = axios.create({
  baseURL: 'https://0361-125-133-209-20.jp.ngrok.io/',
});

export default instance;
