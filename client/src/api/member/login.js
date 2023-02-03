import authRequest from '../authRequest';

export const login = async (email, password) => {
  try {
    const res = await authRequest.post('/auth/login', {
      username: email,
      password: password,
    });
    localStorage.setItem('AccessToken', res.headers.authorization);
    localStorage.setItem('refreshToken', res.headers.refresh);
    localStorage.setItem('memberId', res.data.memberId);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    await authRequest.post('/auth/logout', '', {
      headers: {
        Refresh: refreshToken,
      },
    });
    localStorage.clear();
  } catch (e) {
    console.log(e);
    throw e;
  }
};
