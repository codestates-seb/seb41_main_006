import defalutRequest from '../defaultRequest';
import authRequest from '../authRequest';
import wait from '../../utils/wait';
import dummyBoards from './dummyBoards';

// /boards?page={}&size={}&place-code={}
export const getBoardList = async ({ page, size, placeCode }) => {
  try {
    // 법정 코드가 입력되었다면
    const res = await defalutRequest.get('/boards', {
      params: { page, size, 'place-code': placeCode },
    });

    console.log(res.data.data);
    return res?.data?.data;
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

// GET /boards/my-boards
export const getMyBoardsList = async () => {
  try {
    const res = await authRequest.get('/boards/my-boards');
    return res?.data?.data;
  } catch (err) {
    console.log(err);
  }
};
