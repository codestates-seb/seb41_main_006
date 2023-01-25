import styled from 'styled-components';
import Title from '../common/Title';
import ProfileImage from '../common/ProfileImage';
import SelectAge from '../SelectAge';
import { useEffect, useRef, useState } from 'react';
import getAddressList from '../../api/kakaoMap/getAddressList';
import Button from '../common/Button';
import { IoLocationSharp } from 'react-icons/io5';
import { HiXMark } from 'react-icons/hi2';

const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  gap: 1rem;

  .label {
    color: var(--main-font-color);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .error {
    color: var(--error-color);
    margin-top: 0.25rem;
    padding-left: 0.5rem;
    font-size: 0.875rem;
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid rgb(167, 150, 137, 0.4);
    font-size: 1rem;
    border-radius: 5px;
    padding: 10px;
    ::placeholder {
      color: var(--sec-color);
      font-size: 14px;
      /* font-weight: 500; */
    }
  }

  > .select-container {
    width: 100%;
    display: flex;
    gap: 0.5rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .img-wrapper {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    > input {
      display: none;
    }

    > .btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 1rem;
      gap: 0.2rem;

      button {
        height: 1.75rem;
        padding: 0 1rem;
        border-radius: 100px;
      }

      > .img-upload-btn {
        background-color: var(--sec-color);
        color: white;
        border-radius: 100px;
      }

      > .img-delete-btn {
        color: var(--sec-color);
      }
    }
  }
`;

const NickNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GenderSelectWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  .gender-button {
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
        color: var(--main-font-color);
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
      color: var(--main-font-color);
      border: 1.5px solid var(--main-font-color);
      font-weight: 500;
    }
  }
`;

const AgeSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const AddressWrapper = styled.div`
  text-align: left;
  width: 100%;
  position: relative;

  > .address-list {
    position: absolute;
    z-index: 9;
    background-color: white;
    width: 100%;
    height: max-content;
    top: 4.5rem;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 10px;

    > div {
      width: 100%;
      color: var(--sec-color);
    }
  }
`;

const AddressSearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  > input {
    padding-right: 2rem;
  }

  > svg {
    cursor: pointer;
    position: absolute;
    right: 1rem;
  }
`;

const AddressListItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.8rem;
  color: var(--sec-color);

  &:hover {
    color: var(--main-font-color);
  }
`;

const AboutMeWrapper = styled.div`
  width: 100%;
  textarea {
    width: 100%;
    resize: none;
    height: 100px;
    border-radius: 5px;
    padding: 10px 0 0 10px;
  }
`;

const MemberInfoInput = ({ isEditMode, memberInfo, memberInfoForm }) => {
  // 여러 개의 input의 value, error, change 이벤트 핸들러
  const {
    values,
    setValueByName,
    setValues,
    errors,
    setErrorByName,
    handleChange,
    handleSubmit,
  } = memberInfoForm;
  const [searchAddress, setSearchAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  const imgRef = useRef();

  useEffect(() => {
    const setMemberInfo = async () => {
      setValues({
        ...values,
        nickName: memberInfo.nickName,
        memberAge: memberInfo.memberAge,
        gender: memberInfo.gender,
        aboutMe: memberInfo.aboutMe,
      });

      setPreviewImgUrl(memberInfo.profileImage);
      setSearchAddress(memberInfo.address);
    };

    if (isEditMode) {
      setMemberInfo();
    }
  }, [memberInfo]);

  const handleImgUpload = () => {
    imgRef.current.click();
  };

  //인풋에서 이미지 업로드 시 스테이트 변경
  const handleImgChange = (e) => {
    if (e.target.files === undefined) {
      return;
    }
    //파일 크기 걸러줌
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      setErrorByName('profileImageFile', '최대 파일 용량은 5MB입니다.');
    } else {
      setErrorByName('profileImageFile', '');
      setValueByName('profileImageFile', e.target.files[0]);

      // 미리보기 blob url
      const blobUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImgUrl(blobUrl);
    }
  };

  // 검색어에 맞는 주소 결과(주소, 코드) 리스트 받아옴
  const handleSearchAddressKeyUp = async (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
        return;
      }

      try {
        const result = await getAddressList(e.target.value);
        setAddressList(result);
        setIsAddressListOpen(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 주소 클릭하면 선택됨
  const handleClickAddress = (index) => {
    // input value
    setSearchAddress(addressList[index].addressName);
    // 선택한 결과의 배열 index를 이용해 서버에 보낼 법정 코드를 설정
    setValueByName('address', addressList[index].bCode);
    // 검색창 닫고 초기화
    setErrorByName('address', '');
    setIsAddressListOpen(false);
    setAddressList([]);
  };

  const handleClickDeleteImage = () => {
    if (previewImgUrl) {
      // URL Object 객체 메모리에서 삭제
      URL.revokeObjectURL(previewImgUrl);
      setPreviewImgUrl('');
    }
    // 실제 S3 에서 삭제해아함
  };

  const handleClickDeleteAddress = () => {
    setSearchAddress('');
    setValueByName('address', '');
  };

  return (
    <MemberInfoContainer>
      <Title as="h1" size="large">
        {isEditMode ? '견주 정보 수정' : '견주 정보 입력'}
      </Title>
      <ImageWrapper>
        <div className="label">프로필 이미지</div>
        <div className="img-wrapper">
          <ProfileImage src={previewImgUrl} alt="no-one" size="100px" />
          <input
            type="file"
            className="img-upload"
            accept="image/*"
            ref={imgRef}
            onChange={handleImgChange}
          ></input>
          <div className="btn-container">
            <button className="img-upload-btn" onClick={handleImgUpload}>
              이미지 업로드
            </button>
            <button className="img-delete-btn" onClick={handleClickDeleteImage}>
              이미지 삭제
            </button>
          </div>
        </div>
        <p className="error">{errors.profileImageFile}</p>
      </ImageWrapper>
      <NickNameWrapper>
        <div className="label">닉네임</div>
        <input
          type="text"
          placeholder="닉네임"
          name="nickName"
          value={values.nickName}
          onChange={handleChange}
        ></input>
        <p className="error">{errors.nickName}</p>
      </NickNameWrapper>
      <div className="select-container">
        <GenderSelectWrapper className="gender-select">
          <div className="label">성별</div>
          <div className="gender-button">
            <button
              name="gender"
              value="M"
              className={`left ${values.gender === 'M' ? 'selected' : ''}`}
              onClick={handleChange}
            >
              남
            </button>
            <button
              name="gender"
              value="F"
              className={`right ${values.gender === 'F' ? 'selected' : ''}`}
              onClick={handleChange}
            >
              여
            </button>
          </div>
          <p className="error">{errors.gender}</p>
        </GenderSelectWrapper>
        <AgeSelectWrapper>
          <div className="label">나이</div>
          <SelectAge curValue={values.memberAge} handleSelect={handleChange} />
          <p className="error">{errors.memberAge}</p>
        </AgeSelectWrapper>
      </div>
      <AddressWrapper>
        <div className="label">주소</div>
        <AddressSearchBox>
          <input
            type="text"
            placeholder="동 이름을 검색하세요"
            onKeyUp={handleSearchAddressKeyUp}
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          ></input>
          <HiXMark onClick={handleClickDeleteAddress} />
        </AddressSearchBox>
        {isAddressListOpen && (
          <div className="address-list">
            {addressList.length === 0 ? (
              <div>검색 결과가 없습니다.</div>
            ) : (
              <ul>
                {addressList.map((el, idx) => (
                  <AddressListItem
                    key={el.id}
                    onClick={() => handleClickAddress(idx)}
                  >
                    <IoLocationSharp className="location-icon" />
                    {el.addressName}
                  </AddressListItem>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="error">{errors.address}</p>
      </AddressWrapper>
      <AboutMeWrapper>
        <div className="label">인사말</div>
        <textarea
          placeholder="인사말을 입력하세요"
          name="aboutMe"
          value={values.aboutMe}
          onChange={handleChange}
        ></textarea>
      </AboutMeWrapper>
      <Button size="large" fullWidth onClick={handleSubmit}>
        완료
      </Button>
    </MemberInfoContainer>
  );
};

export default MemberInfoInput;
