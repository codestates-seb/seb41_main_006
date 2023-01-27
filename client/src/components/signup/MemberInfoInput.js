import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../common/Title';
import ProfileImage from '../common/ProfileImage';
import Select from '../common/Select';
import Button from '../common/Button';
import selectAgeLists from '../../static/selectAgeList';
import memberInfoValidate from '../../utils/memberInfoValidate';
import { IoLocationSharp } from 'react-icons/io5';
import { HiXMark } from 'react-icons/hi2';
import useForm from '../../hooks/useForm';
import { authNickName, signUp } from '../../api/member/signup';
import { memberImageUpload, memberImageDelete } from '../../api/image';
import { updateMyInfo } from '../../api/member/member';
import getAddressList from '../../api/kakaoMap/getAddressList';

const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  gap: 1rem;

  text-align: left;
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

  .nickname-input--wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 0.5rem;
    > button {
      line-height: 1.5rem;
      width: 7rem;
      color: var(--main-color);
      border: 1px solid var(--main-color);
      font-size: 0.875rem;
      border-radius: 5px;
      padding: 0.5rem;

      &:disabled {
        visibility: hidden;
      }
    }
  }

  > .email-verified--msg {
    color: var(--success-color);
    margin-top: 0.25rem;
    padding-left: 0.5rem;
    font-size: 0.875rem;
  }
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

  > .selected {
    border: 1.5px solid var(--main-font-color);
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

const MemberInfoInput = ({
  isEditMode,
  memberInfo,
  auth,
  // handleModalClose,
}) => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const updateMyInfoMutation = useMutation(updateMyInfo, {
    onSuccess: () => {
      // invalidates cache and refetcn
      // 모달창 닫음
      // handleModalClose();
      // 나의 정보 새로고침
      // queryClient.invalidateQueries('myInfo');
    },
  });
  // 여러 개의 input의 value, error, change 이벤트 핸들러
  const {
    values,
    setValueByName,
    setValues,
    errors,
    setErrors,
    setErrorByName,
    handleChange,
  } = useForm({
    initialValues: {
      nickName: '',
      memberAge: '',
      address: '',
      gender: '',
      aboutMe: '',
      profileImageId: null,
    },
    onSubmit: async () => {},
    validate: memberInfoValidate,
  });
  // 검색 결과로 화면에 표시될 주소
  const [searchAddress, setSearchAddress] = useState('');
  // 동 검색 결과 리스트
  const [addressList, setAddressList] = useState([]);
  // 결과 리스트 열림/닫힘
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  // 닉네임 중복 확인 여부
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);
  // 업로드 시 바뀌는 이미지 파일
  const [profileImageFile, setProfileImageFile] = useState(null);
  // 사진 미리보기
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  const imgRef = useRef();

  // 수정하는 경우에는 기존의 정보를 가지고 시작한다.
  useEffect(() => {
    const setMemberInfo = () => {
      // values를 기존의 정보로 초기화
      setValues({
        ...values,
        nickName: memberInfo.nickName,
        memberAge: memberInfo.memberAge,
        address: memberInfo.address,
        gender: memberInfo.gender,
        aboutMe: memberInfo.aboutMe,
        profileImageId: memberInfo.profileImage?.upFileId,
      });
      // 미리보기 이미지도 기존 이미지로 설정
      setPreviewImgUrl(memberInfo.profileImage?.upFileUrl);
      setSearchAddress(memberInfo.fullAddress);
    };

    // 만약 수정하는 경우 기존의 정보를 가져온다.
    if (isEditMode) {
      setMemberInfo();
    }
  }, [memberInfo]);

  // 닉네임 값에 변화가 생기면 이 전에 중복 확인이 완료 되었어도 새로운 값에 대한 중복 확인이 필요함
  useEffect(() => {
    setIsNicknameVerified(false);
  }, [values.nickName]);

  /* 이미지 */
  // 이미지 업로드 버튼 클릭 -> 업로드 화면 오픈
  const handleImgUpload = () => {
    imgRef.current.click();
  };

  // 이미지 업로드 파일 변화 이벤트 핸들러
  const handleImgChange = (e) => {
    if (e.target.files === undefined) {
      return;
    }
    //파일 크기 걸러줌
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      setErrorByName('profileImageId', '최대 파일 용량은 5MB입니다.');
    } else {
      // 오류 메시지를 초기화
      setErrorByName('profileImageId', '');
      // 업로드할 이미지 파일 설정
      setProfileImageFile(e.target.files[0]);

      // 미리보기 blob url
      const blobUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImgUrl(blobUrl);

      // 이미지 input value 초기화(다음 업로드 대기 상태로) - (이게 onChange 반응하게 해줌)
      e.target.value = '';
    }
  };

  // 이미지 삭제 버튼 클릭
  const handleClickDeleteImage = () => {
    if (previewImgUrl) {
      // URL Object 객체 메모리에서 삭제
      URL.revokeObjectURL(previewImgUrl);
      setPreviewImgUrl('');
    }

    // file 값도 null
    setProfileImageFile(null);
  };

  /* 주소 검색 */
  // 검색어에 맞는 주소 결과(주소, 코드) 리스트 받아옴
  const handleSearchAddressKeyUp = async (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
        return;
      }

      try {
        const result = await getAddressList(e.target.value);
        // 검색 결과 리스트 설정
        setAddressList(result);
        // 결과창 오픈
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

  const handleNickNameVerify = async () => {
    if (!values.nickName) {
      // 닉네임을 입력하지 않았다면
      setErrorByName('nickName', '닉네임을 입력해주세요');
      return;
    }

    try {
      await authNickName(values.nickName);
      // 중복 확인 완료
      setErrorByName('nickName', '');
      setIsNicknameVerified(true);
    } catch (err) {
      if (err.status === 409) {
        setErrorByName('nickName', '이미 사용 중인 닉네임 입니다.');
      }
      setIsNicknameVerified(false);
    }
  };

  // 검색 결과 초기화
  const handleClickDeleteAddress = () => {
    setValueByName('address', '');
    setSearchAddress('');
  };

  /* 결과 제출 */
  const handleSubmit = async () => {
    // 만약 닉네임 중복 확인이 완료되지 않았다면
    if (!isNicknameVerified) {
      // 지금이 수정 모드이면서 기존의 닉네임과 같다면 중복 확인 할 필요가 없다.
      // 그 나머지 경우에만 중복 확인을 한다.
      if (!(isEditMode && memberInfo?.nickName === values.nickName)) {
        setErrorByName('nickName', '중복 확인이 필요합니다');
        return;
      }
    }

    // input 에러 없는지 확인
    const memberInfoError = memberInfoValidate(values);

    if (Object.keys(memberInfoError).length !== 0) {
      console.log('오류가 있음');
      setErrors(memberInfoError);
      return;
    }

    let imageInfo = null;
    try {
      // 정보 수정 시에 제출이 확정되었다면 기존의 이미지와 다른지 비교하여 다르면 S3에서 기존의 이미지를 지워야함
      if (
        memberInfo?.profileImage &&
        memberInfo?.profileImage?.upFileUrl !== previewImgUrl
      ) {
        // 기존에 이미지가 존재하고
        // 만약 기존의 이미지 URL과 화면에 띄워진 URL이 같지 않다면 (업로드할 파일이 변했다면)
        // 수정모드일 때 기존에 파일에서 바꿨다면 previewUrl도 달라짐
        // s3 이미지 지우기
        console.log('hi');
        await memberImageDelete(memberInfo.profileImage.upFileUrl);
      }

      // 이미지 파일이 존재하면(업로드한 파일이 있음)
      if (profileImageFile) {
        // S3에 이미지 업로드
        imageInfo = await memberImageUpload(profileImageFile);
      }

      if (isEditMode) {
        updateMyInfoMutation.mutate({
          memberId: memberInfo.memberId,
          data: {
            ...values,
            // 업로드 된 이미지 아이디 정보
            profileImageId: imageInfo?.upFileId,
            // response body에 필요한 정보들
            email: memberInfo.email,
            memberStatus: memberInfo.memberStatus,
          },
        });
      } else {
        // 회원가입: 이메일 정보 포함 모든 정보를 submit 한다.
        await signUp({
          // input value
          ...values,
          // 업로드 된 이미지 아이디 정보
          profileImageId: imageInfo?.upFileId,
          // 이전 화면에서 입력된 이메일과 패스워드
          email: auth.email,
          password: auth.password,
        });
        // 메인 페이지로!
        navigate('/');
        // 로그인 모달 같이 띄우면 좋을 것 같음
      }
    } catch (err) {
      // 요청이 실패했는데 벌써 이미지가 업로드 된 상황이라면...
      if (imageInfo) {
        console.log('멤버 수정 모달: 요청 실패하여 이미지 삭제함');
        // 지금 업로드 된 파일을 다시 지운다.
        await memberImageDelete(imageInfo.upFileUrl);
      }
      console.log(err);
    }
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
        <p className="error">{errors.profileImageId}</p>
      </ImageWrapper>
      <NickNameWrapper>
        <div className="label">닉네임</div>
        <div className="nickname-input--wrapper">
          <input
            type="text"
            placeholder="닉네임"
            name="nickName"
            value={values.nickName}
            onChange={handleChange}
          ></input>
          <button
            onClick={handleNickNameVerify}
            disabled={isEditMode && memberInfo.nickName === values.nickName}
          >
            중복 확인
          </button>
        </div>
        <p className="error">{errors.nickName}</p>
        {isNicknameVerified && (
          <p className="email-verified--msg">중복 확인 완료!</p>
        )}
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
          <Select
            curValue={values.memberAge}
            handleSelect={handleChange}
            selectList={selectAgeLists}
          />
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
            className={values.address && 'selected'}
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
