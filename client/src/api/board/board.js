import wait from '../../utils/wait';
import dummyBoards from './dummyBoards';

// /boards
export const getBoardList = async ({ page, size, bCode }) => {
  try {
    console.log(
      `보드리스트를 불러옵니다. 페이지 ${page} 사이즈 ${size} 법정 코드${bCode}`
    );
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
