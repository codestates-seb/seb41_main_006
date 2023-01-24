import dummyMembers from './dummyMembers';
import wait from '../../utils/wait';
import dummyBoards from '../board/dummyBoards';

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

// POST /members
export const postNewMember = async (values) => {
  console.log('포스트 보내는 중', values);
  await wait(500);
};
