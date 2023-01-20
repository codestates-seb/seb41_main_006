import wait from '../../utils/wait';
import dummyBoards from './dummyBoards';

// /boards
export const getBoardList = async () => {
  try {
    await wait(500);
    return dummyBoards.data;
  } catch (err) {
    console.log(err);
  }
};

// /boards/:id
export const getBoardById = async (boardId) => {
  try {
    await wait(500);
    return dummyBoards.data.find((el) => el.boardId === boardId);
  } catch (err) {
    console.log(err);
  }
};
