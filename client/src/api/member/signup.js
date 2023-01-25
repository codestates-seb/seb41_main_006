import defaultAxios from '../defaultRequest';

export const authEmail = async (email) => {
  try {
    await defaultAxios.post('/auth/email', { email });
  } catch (err) {
    console.log(err?.response?.data);
    throw err?.response?.data;
  }
};

export const authEmailVerification = async ({ code, email }) => {
  try {
    await defaultAxios.post('/auth/email/verification', { code, email });
  } catch (err) {
    console.log(err?.response?.data);
    throw err?.response?.data;
  }
};

// POST /members
export const signUp = (data) => defaultAxios.post('/members', data);
