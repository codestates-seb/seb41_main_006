import styled from 'styled-components';
import Title from '../common/Title';
import ProfileImage from '../common/ProfileImage';
import SelectAge from '../SelectAge';
import { useEffect, useRef, useState } from 'react';
import getAddressList from '../../api/kakaoMap/getAddressList';
import Button from '../common/Button';
import { IoLocationSharp } from 'react-icons/io5';

const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
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
  const { values, setValues, errors, handleChange, handleSubmit } =
    memberInfoForm;
  const [searchAddress, setSearchAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);

  const imgRef = useRef();
  const FILE_VALUE = 'image';

  useEffect(() => {
    if (isEditMode) {
      // 만약 수정하는 경우라면 기존의 멤버 정보로 초기 세팅
      memberInfoForm.setValues(memberInfo);
      // 받아온 법정 코드를 api 이용하여 주소명으로 바꿔준다.
      // setSearchAddress(memberInfo.address -> '주소명');
    }
  }, []);

  const handleImgUpload = () => {
    imgRef.current.click();
  };

  //인풋에서 이미지 업로드 시 스테이트 변경
  const handleImgChange = (e) => {
    if (e.target.files === undefined) {
      return;
    }
    //파일 확장자 , 크기 걸러줌
    if (!e.target.files[0].type.includes(FILE_VALUE)) {
      alert('허용된 확장자가 아닙니다.');
    } else if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert('최대 파일 용량은 5MB입니다.');
    } else {
      // 이미지 파일 서버에 업로드 후 어떻게??????? -> 이미지 프리뷰할 수 있는 방법이 있음
      // setProfile(e.target.files[0]);
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

  const handleClickAddress = (index) => {
    // input value
    setSearchAddress(addressList[index].addressName);
    // 선택한 결과의 배열 index를 이용해 서버에 보낼 법정 코드를 설정
    setValues({ ...values, address: addressList[index].bCode });
    // 검색창 닫고 초기화
    setIsAddressListOpen(false);
    setAddressList([]);
  };

  return (
    <MemberInfoContainer>
      <Title as="h1" size="large">
        견주 정보 입력
      </Title>
      <ImageWrapper>
        <div className="label">프로필 이미지</div>
        <div className="img-wrapper">
          {isEditMode ? (
            <ProfileImage src={memberInfo.profileImage} alt="" size="100px" />
          ) : (
            <ProfileImage src="" alt="no-one" size="100px" />
          )}
          <input
            type="file"
            className="img-upload"
            ref={imgRef}
            onChange={handleImgChange}
          ></input>
          <div className="btn-container">
            <button className="img-upload-btn" onClick={handleImgUpload}>
              이미지 업로드
            </button>
            <button className="img-delete-btn">이미지 삭제</button>
          </div>
        </div>
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
        <input
          type="text"
          placeholder="동 이름을 검색하세요"
          onKeyUp={handleSearchAddressKeyUp}
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        ></input>
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