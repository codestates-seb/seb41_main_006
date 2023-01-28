import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useForm from '../../hooks/useForm';
import PetProfileImage from '../common/PetProfileImage';
import Button from '../common/Button';
import Select from '../common/Select';
import selectPetSizeList from '../../static/selectPetSizeList';
import { isNotNumber } from '../../utils/validateFunctions';
import petInfoValidate from '../../utils/petInfoValidats';
import { petImageUpload, petImageDelete } from '../../api/image';
import { createMyPet, updateMyPet } from '../../api/pet/pet';

const PetInfoInputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PetInfoInputForm = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  > .container {
    display: flex;
    flex-direction: column;
    margin: 2% 5%;

    > .img-container {
      width: 18rem;
      height: 20rem;
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
  }
  .detail-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 600;
    input {
      line-height: 30px;
      border: 0.4px solid #b7a69e;
      border-radius: 4px;
      padding-left: 5px;
    }
    > * {
      margin: 20px 20px 20px 0;
    }
    .name-input {
      display: flex;
      div {
        margin-right: 2%;
      }
      input {
        margin-right: 2%;
      }
      .age-input {
        width: 10%;
      }
    }
    .gender-button {
      display: flex;
      div {
        margin-right: 2%;
      }
      button {
        width: 20%;
        border: 0.4px solid #b7a69e;
        border-radius: 4px;
        background-color: white;
        color: var(--sec-color);
        :hover {
          background-color: var(--main-font-color);
          color: white;
        }
      }
      .selected {
        background-color: var(--main-font-color);
        color: white;
      }
    }
    .breed-input {
      display: flex;
      div {
        margin-right: 2%;
      }
    }
    .etc-input {
      text-align: left;
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        border: 0.4px solid #b7a69e;
        border-radius: 4px;
        padding: 5px;
      }
    }
  }
`;
const Scheckbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  margin-left: 5%;
  appearance: none;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--main-font-color);
  }
`;

const PetInfoInput = ({ petInfo, isEditMode, handleModalClose }) => {
  const {
    values,
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
        profileImageId: petInfo.profileImage?.upFileId,
      });
      setPreviewImgUrl(petInfo.profileImage?.upFileUrl);
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
    try {
      // 제출이 확정되었다면 기존의 이미지와 다른지 비교하여 다르면 S3에서 기존의 이미지를 지워야함
      // 만약 기존에 이미지가 있었는데 이후에 업로드를 통해 바뀌었다면!
      if (
        petInfo?.profileImage &&
        petInfo?.profileImage?.upFileUrl !== previewImgUrl
      ) {
        // 기존의 이미지는 지운다.
        await petImageDelete(petInfo.profileImage.upFileUrl);
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
            profileImageId: imageInfo?.upFileId,
          },
        });
      } else {
        createMyPetMutation.mutate({
          ...values,
          // 업로드 된 이미지 아이디 정보
          profileImageId: imageInfo?.upFileId,
        });
      }
      handleModalClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PetInfoInputContainer>
      <h2>{isEditMode ? '강아지 정보 수정' : '나의 강아지 추가'}</h2>
      <PetInfoInputForm>
        <div className="container">
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
        </div>
        <div className="detail-info">
          <div className="name-input">
            <div>이름</div>
            <input
              type="text"
              placeholder="이름"
              name="name"
              value={values.name}
              onChange={handleChange}
            ></input>
            <div>나이</div>
            <input
              type="text"
              maxLength={2}
              name="age"
              value={values.age}
              onChange={handleChangeAge}
              className="age-input"
            ></input>
            <span>살</span>
          </div>
          <div className="gender-button">
            <div>성별</div>
            <button
              name="gender"
              value="M"
              className={`left ${values.gender === 'M' ? 'selected' : ''}`}
              onClick={handleChange}
            >
              수컷
            </button>
            <button
              name="gender"
              value="F"
              className={`right ${values.gender === 'F' ? 'selected' : ''}`}
              onClick={handleChange}
            >
              암컷
            </button>
            <Scheckbox
              type="checkbox"
              value={values.neutered}
              checked={values.neutered}
              onChange={(e) => {
                if (e.target.checked) setValueByName('neutered', true);
                else setValueByName('neutered', false);
              }}
            />
            <span>중성화 여부</span>
          </div>
          <div className="breed-input">
            <div>견종</div>
            <input
              type="text"
              name="breed"
              value={values.breed}
              onChange={handleChange}
            ></input>
            <div>크기</div>
            <Select
              curValue={values.petSize}
              handleSelect={handleChange}
              selectList={selectPetSizeList}
            />
          </div>
          <div className="etc-input">
            <div>특이사항</div>
            <textarea
              name="aboutDog"
              value={values.aboutDog}
              onChange={handleChange}
            ></textarea>
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
