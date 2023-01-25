import defaultAxios from '../defaultRequest';

export const authEmail = (email) => defaultAxios.post('/auth/email', { email });

export const authEmailVerification = ({ code, email }) =>
  defaultAxios.post('/auth/email/verification', { code, email });

// POST /members
export const signUp = (data) => defaultAxios.post('/members', data);
