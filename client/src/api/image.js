import authRequest from './authRequest';

// 멤버 이미지 업로드 /s3/member
export const memberImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('images', file);

  try {
    const res = await authRequest.post('/s3/member', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 멤버 이미지 삭제
export const memberImageDelete = async (fileUrl) => {
  try {
    await authRequest.delete('/s3/member', {
      params: { upFileUrl: fileUrl },
    });
  } catch (err) {
    console.log(err?.response);
  }
};

// 강아지 이미지 업로드 /s3/pet
export const petImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('images', file);

  try {
    const res = await authRequest.post('/s3/pet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const petImageDelete = async (fileUrl) => {
  try {
    await authRequest.delete('/s3/pet', {
      params: { upFileUrl: fileUrl },
    });
  } catch (err) {
    console.log(err?.response);
    throw err;
  }
};
