import dummyMembers from './dummyMembers';
import wait from '../../utils/wait';
import dummyBoards from '../board/dummyBoards';
import authRequest from '../authRequest';

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

// GET /members/${members}/my-page
export const getMyInfo = async (memberId) => {
  try {
    const res = await authRequest.get(`/members/${memberId}/my-page`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// POST
