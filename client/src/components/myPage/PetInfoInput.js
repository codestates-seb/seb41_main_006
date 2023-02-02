import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useForm from '../../hooks/useForm';
import PetProfileImage from '../common/PetProfileImage';
import Button from '../common/Button';
import Select from '../common/Select';
import selectPetSizeList from '../../static/selectPetSizeList';
import { isNotNumber } from '../../utils/validateFunctions';
import petInfoValidate from '../../utils/petInfoValidate';
import { petImageUpload, petImageDelete } from '../../api/image';
import { createMyPet, updateMyPet } from '../../api/pet/pet';
import { RowCenterBox } from '../FlexBoxs';

const PetInfoInputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PetInfoInputForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  overflow: scroll;
  // 스크롤바 가리기
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  .label {
    color: var(--main-font-color);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .error {
    color: var(--error-color);
    margin-top: 0.25rem;
    font-size: 0.8rem;
    text-align: left;
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid rgb(167, 150, 137, 0.4);
    font-size: 1rem;
    border-radius: 5px;
    padding: 10px;
    resize: none;
    ::placeholder {
      color: var(--sec-color);
      font-size: 14px;
      /* font-weight: 500; */
    }
  }

  .wrapper {
    .label {
      width: 100%;
      text-align: left;
    }
  }

  > .detail-info {
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const PetImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  height: 100%;

  > .img-container {
    width: 16rem;
    height: 18rem;
  }

  .img-button {
    display: flex;
    margin-top: 2%;
    justify-content: space-around;
    input {
      display: none;
    }
    button {
      color: var(--sec-color);
      border: 0;
      border-radius: 4px;
      width: 40%;
      background-color: var(--bg-color);
      :hover {
        background-color: var(--sec-color);
        color: white;
      }
    }
  }
`;

const PetAgeWrapper = styled.div`
  margin-left: 1rem;
  input {
    width: 2.75rem;
    margin-right: 0.25rem;
  }
`;

const PetGenderWrapper = styled.div`
  flex: 1;
  .gender-button {
    width: 13rem;
    display: flex;
    align-items: center;
    button {
      flex-grow: 1;
      line-height: 1.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      background-color: white;
      border: 1px solid rgb(167, 150, 137, 0.4);
      color: var(--sec-color);
      /* font-weight: 500; */
      :hover {
        color: var(--main-color);
      }
    }

    > .left {
      border-radius: 10px 0 0 10px;
      border-right: none;
    }

    > .right {
      border-radius: 0px 10px 10px 0;
    }

    .selected {
      color: var(--main-color);
      border: 1.5px solid var(--main-color);
      font-weight: 500;
    }
  }
`;

const PetCheckNeutredWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  height: 100%;
  > div {
    font-size: 0.875rem;
    width: 5rem;
  }

  > input {
    width: 1.5rem;
    height: 100%;
    border: 1px solid rgb(167, 150, 137, 0.4);
    border-radius: 0.35rem;
    margin-left: 5%;
    appearance: none;
    background-color: white;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: var(--main-color);
    }
  }
`;

const PetBreedWrapper = styled.div`
  width: 50%;
`;

const PetSizeWrapper = styled.div`
  margin-left: 1rem;
  width: 50%;
`;

const PetInfoInput = ({ petInfo, isEditMode, handleModalClose }) => {
  const {
    values,
    errors,
    setValues,
    setValueByName,
    setErrors,
    setErrorByName,
    handleChange,
  } = useForm({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      breed: '',
      neutered: false,
      petSize: '',
      aboutDog: '',
      profileImageId: null,
    },
    onSubmit: () => {},
    validate: petInfoValidate,
  });
  // 업로드 시 바뀌는 이미지 파일
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState('');
  const queryClient = useQueryClient();

  const updateMyPetsMutation = useMutation(updateMyPet, {
    onSuccess: () => {
      // invalidates cache and refetcn
      // 모달창 닫음
      handleModalClose();
      // 나의 정보 새로고침
      queryClient.invalidateQueries(['myPets']);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const createMyPetMutation = useMutation(createMyPet, {
    onSuccess: () => {
      handleModalClose();
      queryClient.invalidateQueries(['myPets']);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const imgRef = useRef();

  useEffect(() => {
    const setPetInfo = () => {
      setValues({
        ...values,
        name: petInfo.name,
        age: petInfo.age,
        gender: petInfo.gender,
        breed: petInfo.breed,
        neutered: petInfo.neutered,
        petSize: petInfo.petSize,
        aboutDog: petInfo.aboutDog,
        profileImageId: petInfo?.profileImage?.upFileId,
      });
      setPreviewImgUrl(petInfo?.profileImage?.upFileUrl);
    };

    if (isEditMode && petInfo) {
      setPetInfo();
    }
  }, []);
  const handleImgUpload = () => {
    imgRef.current.click();
  };

  // 이미지 업로드 핸들러
  const handleImgChange = (e) => {
    if (e.target.files === undefined) {
      return;
    }
    //파일 크기 걸러줌
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      setErrorByName('profileImageId', '최대 파일 용량은 5MB입니다.');
    } else {
      setErrorByName('profileImageId', '');
      setProfileImageFile(e.target.files[0]);

      // 미리보기 blob url
      const blobUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImgUrl(blobUrl);

      // 이미지 input value 초기화(다음 업로드 대기 상태로) - (이게 onChange 반응하게 해줌)
      e.target.value = '';
    }
  };

  const handleClickDeleteImage = () => {
    if (previewImgUrl) {
      // URL Object 객체 메모리에서 삭제
      URL.revokeObjectURL(previewImgUrl);
      setPreviewImgUrl('');
    }

    // file 값도 null
    setProfileImageFile(null);
  };

  const handleChangeAge = (e) => {
    // 숫자가 아닌 경우는 입력하지 않는다.
    if (e.nativeEvent.data && isNotNumber(e.nativeEvent.data)) {
      e.preventDefault();
      return null;
    }
    // 길이를 2로 제한한다.
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);

    setValueByName('age', e.target.value.replace(/(^0+)/, ''));
  };

  const handleSubmit = async () => {
    const petErrors = petInfoValidate(values);
    // 오류가 하나라도 존재한다면
    if (Object.keys(petErrors).length !== 0) {
      // 오류 메시지 설정 후
      setErrors(petErrors);
      // 제출 취소
      return;
    }

    let imageInfo = null;
    // 기존의 이미지 아이디를 기억하는 변수 (이후 업로드에 사용)
    let deletedImage = values.profileImageId;
    try {
      // 제출이 확정되었다면 기존의 이미지와 다른지 비교하여 다르면 S3에서 기존의 이미지를 지워야함
      // 만약 기존에 이미지가 있었는데 이후에 업로드를 통해 바뀌었다면!
      if (
        petInfo?.profileImage &&
        petInfo?.profileImage?.upFileUrl !== previewImgUrl
      ) {
        // 기존의 이미지는 지운다.
        await petImageDelete(petInfo.profileImage.upFileUrl);
        // 지워졌으니 업로드 할 이미지는 null
        deletedImage = null;
      }

      if (profileImageFile) {
        // 이미지 파일이 존재하면(새로 올라온 이미지가 있다면)
        // 업로드 후 해당 이미지의 정보를 가져옴
        imageInfo = await petImageUpload(profileImageFile);
      }

      if (isEditMode) {
        updateMyPetsMutation.mutate({
          petId: petInfo.petId,
          data: {
            ...values,
            // 업로드할 이미지가 있다면 올리고 아니면 기존에 있던 이미지를 올리거나 null
            profileImageId: imageInfo?.upFileId || deletedImage,
          },
        });
      } else {
        createMyPetMutation.mutate({
          ...values,
          // 업로드 된 이미지 아이디 정보
          profileImageId: imageInfo?.upFileId || deletedImage,
        });
      }
    } catch (err) {
      console.log(err);
      if (imageInfo) {
        console.log('멤버 수정 모달: 요청 실패하여 이미지 삭제함');
        // 지금 업로드 된 파일을 다시 지운다.
        await petImageDelete(imageInfo.upFileUrl);
      }
    }
  };

  return (
    <PetInfoInputContainer>
      <h2>{isEditMode ? '강아지 정보 수정' : '나의 강아지 추가'}</h2>
      <PetInfoInputForm>
        <PetImageContainer>
          <div className="label">강아지 사진</div>
          <div className="img-container">
            <PetProfileImage src={previewImgUrl} alt="" />
          </div>
          <div className="img-button">
            <button onClick={handleImgUpload}>이미지 업로드</button>
            <input
              type="file"
              className="img-upload"
              accept="image/*"
              ref={imgRef}
              onChange={handleImgChange}
            ></input>
            <button onClick={handleClickDeleteImage}>이미지 삭제</button>
          </div>
          <p className="error">{errors.profileImageId}</p>
        </PetImageContainer>
        <div className="detail-info">
          <RowCenterBox>
            <div>
              <div className="wrapper">
                <div className="label">이름</div>
                <input
                  type="text"
                  placeholder="최대 10자"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                ></input>
              </div>
              <p className="error">{errors.name}</p>
            </div>
            <PetAgeWrapper>
              <div className="wrapper">
                <div className="label">나이</div>
                <RowCenterBox>
                  <input
                    type="text"
                    maxLength={2}
                    name="age"
                    value={values.age}
                    onChange={handleChangeAge}
                    className="age-input"
                  ></input>
                  <span>살</span>
                </RowCenterBox>
              </div>
              <p className="error">{errors.age}</p>
            </PetAgeWrapper>
          </RowCenterBox>
          <RowCenterBox>
            <PetGenderWrapper>
              <div className="wrapper">
                <div className="label">성별</div>
                <div className="gender-button">
                  <button
                    name="gender"
                    value="M"
                    className={`left ${
                      values.gender === 'M' ? 'selected' : ''
                    }`}
                    onClick={handleChange}
                  >
                    수컷
                  </button>
                  <button
                    name="gender"
                    value="F"
                    className={`right ${
                      values.gender === 'F' ? 'selected' : ''
                    }`}
                    onClick={handleChange}
                  >
                    암컷
                  </button>
                  <PetCheckNeutredWrapper>
                    <input
                      type="checkbox"
                      value={values.neutered}
                      checked={values.neutered}
                      onChange={(e) => {
                        if (e.target.checked) setValueByName('neutered', true);
                        else setValueByName('neutered', false);
                      }}
                    />
                    <div>중성화 여부</div>
                  </PetCheckNeutredWrapper>
                </div>
              </div>
              <p className="error">{errors.gender}</p>
            </PetGenderWrapper>
          </RowCenterBox>
          <RowCenterBox>
            <PetBreedWrapper>
              <div className="wrapper">
                <div className="label">견종</div>
                <input
                  type="text"
                  name="breed"
                  value={values.breed}
                  onChange={handleChange}
                ></input>
              </div>
              <p className="error">{errors.breed}</p>
            </PetBreedWrapper>
            <PetSizeWrapper>
              <div className="wrapper">
                <div className="label">크기</div>
                <Select
                  curValue={values.petSize}
                  handleSelect={handleChange}
                  selectList={selectPetSizeList}
                />
              </div>
              <p className="error">{errors.petSize}</p>
            </PetSizeWrapper>
          </RowCenterBox>
          <div>
            <div className="wrapper">
              <div className="label">특이사항</div>
              <textarea
                name="aboutDog"
                value={values.aboutDog}
                onChange={handleChange}
                placeholder="최대 40자 입력이 가능합니다."
              ></textarea>
            </div>
            <p className="error">{errors.aboutDog}</p>
          </div>
        </div>
      </PetInfoInputForm>
      <div>
        <Button onClick={handleModalClose} size="large" letter>
          취소
        </Button>
        <Button onClick={handleSubmit} size="large">
          완료
        </Button>
      </div>
    </PetInfoInputContainer>
  );
};

export default PetInfoInput;
