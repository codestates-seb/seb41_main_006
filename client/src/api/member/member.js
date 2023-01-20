import dummyMembers from './dummyMembers';
import wait from '../../utils/wait';
import dummyBoards from '../board/dummyBoards';

// member/{memberId}
export const getMemberInfo = async (memberId) => {
  try {
    await wait(500);
    return dummyMembers.data.find((el) => el.memberId === memberId);
  } catch (err) {
    console.log(err);
  }
};

// member/{memberId}/posts
export const getMemberBoardList = async (memberId) => {
  try {
    await wait(500);
    return dummyBoards.data.filter((el) => el.member.memberId === memberId);
  } catch (err) {
    console.log(err);
  }
};
