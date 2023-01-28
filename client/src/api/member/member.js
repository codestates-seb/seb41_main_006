import defaultRequest from '../defaultRequest';
import authRequest from '../authRequest';

// GET /members
export const getMemberList = async ({ page, size, placeCode }) => {
  try {
    // 법정 코드가 입력되었다면
    const res = await defaultRequest.get('/members', {
      params: { page, size, address: placeCode },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// GET /members/{memberId}
export const getMemberInfo = async (memberId) => {
  try {
    const res = await authRequest.get(`/members/${memberId}`);
    return res?.data?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// GET /members/${memberId}/my-page
export const getMyInfo = async (memberId) => {
  try {
    const res = await authRequest.get(`/members/${memberId}/my-page`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// PATCH /members/${memberId}/my-page
export const updateMyInfo = async ({ memberId, data }) => {
  console.log(`멤버 아이디 ${memberId} 회원 데이터 수정 body`, data);
  return await authRequest.patch(`/members/${memberId}/my-page`, data);
};

// DELETE /members/${memberId}
export const deleteMember = async (memberId) => {
  try {
    console.log(memberId);
    // await authRequest.delete(`/members/${memberId}`)
  } catch (err) {
    console.log(err);
    throw err;
  }
};
