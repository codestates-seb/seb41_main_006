import dummyMembers from './dummyMembers';
import wait from '../../utils/wait';
import dummyBoards from '../board/dummyBoards';
import defaultRequest from '../defaultRequest';
import authRequest from '../authRequest';

// GET /members
export const getMemberList = async ({ page, size, placeCode }) => {
  try {
    // 법정 코드가 입력되었다면
    const res = await defaultRequest.get('/members', {
      params: { page, size, address: placeCode },
    });
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// GET /members/{memberId}
export const getMemberInfo = async (memberId) => {
  try {
    await wait(500);
    return dummyMembers.data.find((el) => el.memberId === memberId);
  } catch (err) {
    console.log(err);
  }
};

// GET /members/{memberId}/posts
export const getMemberBoardList = async (memberId) => {
  try {
    await wait(500);
    return dummyBoards.data.filter((el) => el.member.memberId === memberId);
  } catch (err) {
    console.log(err);
  }
};

// GET /members/${memberId}/my-page
export const getMyInfo = async (memberId) => {
  try {
    const res = await authRequest.get(`/members/${memberId}/my-page`);
    console.log(res.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// PATCH /members/${memberId}/my-page
export const updateMyInfo = async ({ memberId, data }) => {
  console.log(`멤버 아이디 ${memberId} 회원 데이터 수정 body`, data);
  try {
    await authRequest.patch(`/members/${memberId}/my-page`, data);
  } catch (err) {
    console.log(err);
    throw err;
  }
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
