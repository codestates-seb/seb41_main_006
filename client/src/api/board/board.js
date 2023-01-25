// import defalutRequest from '../defaultRequest';
import wait from '../../utils/wait';
import dummyBoards from './dummyBoards';

// /boards?page={}&size={}&place-code={}
export const getBoardList = async ({ page, size, placeCode }) => {
  try {
    console.log(
      `보드리스트를 불러옵니다. 페이지 ${page} 사이즈 ${size} 법정 코드${placeCode}`
    );
    await wait(500);
    return dummyBoards.data;
  } catch (err) {
    throw new Error(err);
  }
  // return defalutRequest.get('/boards', {
  //   params: { page, size, 'place-code': placeCode },
  // });
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
