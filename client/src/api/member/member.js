import dummyMembers from './dummyMembers';
import wait from '../../utils/wait';
import { decodeBoardList } from '../board/boardDecodes';
import dummyBoards from '../board/dummyBoards';

export const getMemberInfo = async (memberId) => {
  try {
    await wait(500);
    return dummyMembers.data.find((el) => el.memberId === memberId);
  } catch (err) {
    console.log(err);
  }
};

export const getMemberBoardList = async (memberId) => {
  try {
    await wait(500);
    return decodeBoardList(
      dummyBoards.data.filter((el) => el.member.memberId === memberId)
    );
  } catch (err) {
    console.log(err);
  }
};
