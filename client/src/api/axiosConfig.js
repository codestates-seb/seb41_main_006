import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://e629-125-133-209-20.jp.ngrok.io/',
  timeout: 1000,
});

export default instance;
