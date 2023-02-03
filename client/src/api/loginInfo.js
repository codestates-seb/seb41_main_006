export const getLoginInfo = () => {
  const AccessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const memberId = localStorage.getItem('memberId');

  return { AccessToken, refreshToken, memberId };
};
