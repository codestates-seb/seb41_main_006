import defalutRequest from '../defaultRequest';
import authRequest from '../authRequest';

// /boards?page={}&size={}&place-code={}
export const getBoardList = async ({ page, size, placeCode }) => {
  try {
    const res = await defalutRequest.get('/boards', {
      params: { page, size, 'place-code': placeCode },
    });

    return res?.data?.data;
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
