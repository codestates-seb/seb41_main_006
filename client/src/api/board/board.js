import wait from '../../utils/wait';
import dummyBoards from './dummyBoards';
import { decodeBoardDetail, decodeBoardList } from './boardDecodes';

// /boards
export const getBoardList = async () => {
  try {
    await wait(500);
    return decodeBoardList(dummyBoards.data);
  } catch (err) {
    console.log(err);
  }
};

// /boards/:id
export const getBoardById = async (boardId) => {
  try {
    await wait(500);
    return decodeBoardDetail(
      dummyBoards.data.find((el) => el.boardId === boardId)
    );
  } catch (err) {
    console.log(err);
  }
};
