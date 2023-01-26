import authRequest from '../authRequest';

export const getMyPetList = async ({ page, size }) => {
  try {
    const res = await authRequest.get('/pets/my-pets', {
      params: { page, size },
    });
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
