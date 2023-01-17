import wait from '../../utils/wait';
import dummyBoards from './dummyBoards';
import { decodeBoard, decodeBoardList } from './boardDecode';

// /boards
export const getBoardList = async () => {
  try {
    await wait(1000);
    return decodeBoardList(dummyBoards);
  } catch (err) {
    console.log(err);
  }
};

// /boards/:id
export const getBoardById = async (id) => {
  try {
    await wait(1000);
    dummyBoards.find((el) => el.id === id);
    return decodeBoard(dummyBoards.find((el) => el.id === id)[0]);
  } catch (err) {
    console.log(err);
  }
};
