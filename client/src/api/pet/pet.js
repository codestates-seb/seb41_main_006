import authRequest from '../authRequest';

export const getMyPetList = async ({ page, size }) => {
  try {
    const res = await authRequest.get('/pets/my-pets', {
      params: { page, size },
    });
    return res?.data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const createMyPet = async ({
  name,
  age,
  gender,
  petSize,
  neutered,
  aboutDog,
  breed,
  profileImageId,
}) =>
  await authRequest.post('/pets', {
    name,
    age,
    gender,
    petSize,
    neutered,
    aboutDog,
    breed,
    profileImageId,
  });

export const updateMyPet = async (
  petId,
  { name, age, gender, petSize, neutered, aboutDog, breed, profileImageId }
) =>
  await authRequest.patch(`/pets/${petId}`, {
    name,
    age,
    gender,
    petSize,
    neutered,
    aboutDog,
    breed,
    profileImageId,
  });
