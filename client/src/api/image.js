import defalutRequest from './defaultRequest';

// 멤버 이미지 업로드 /s3/member
export const memberImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('images', file);
  let entries = formData.entries();
  for (const pair of entries) {
    console.log(pair[0] + ', ' + pair[1]);
  }
  return defalutRequest.post('/s3/member', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const memberImageDelete = (fileUrl) => {
  return defalutRequest.delete('/s3/member', {
    params: { upFileUrl: fileUrl },
  });
};
