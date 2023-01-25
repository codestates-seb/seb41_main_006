import defalutRequest from './defaultRequest';
// 멤버 이미지 업로드 /s3/member
export const memberImageUpload = (file) => {
  console.log(file);
  // return instance.post(...)
  return defalutRequest.post('/s3/member', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
