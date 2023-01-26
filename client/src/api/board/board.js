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

    // return data;
  } catch (err) {
    console.log(err);
  }

  // try {
  //   console.log(
  //     `보드리스트를 불러옵니다. 페이지 ${page} 사이즈 ${size} 법정 코드${placeCode}`
  //   );
  //   await wait(500);
  //   return dummyBoards.data;
  // } catch (err) {
  //   throw new Error(err);
  // }
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
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
