import instance from '../axiosConfig';

export const authEmail = (email) => instance.post('/auth/email', { email });

export const authEmailVerification = ({ code, email }) =>
  instance.post('/auth/email/verification', { code, email });
