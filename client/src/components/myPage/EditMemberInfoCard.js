import styled from 'styled-components';
import { useState, useRef } from 'react';
import SelectAge from '../Select';

const SInputInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
  color: var(--main-font-color);
  font-weight: 500;
  input {
    border: 1px solid #b7a69e;
  }
  .next-button {
    line-height: 50px;
    border: 0;
    border-radius: 10px;
    background-color: var(--main-color);
    font-size: 1.5rem;
    color: white;
    margin-top: 20px;
  }
  .title {
    color: var(--main-font-color);
    font-size: 2rem;
    font-weight: 500;
  }
  .input-container {
    display: flex;
    margin-top: 15px;
    .image-container {
      display: flex;
      flex-direction: column;
      padding-right: 10px;
      .Img-upload {
        display: none;
      }
      img {
        background-color: white;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      div {
        background-color: white;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      button {
        line-height: 15px;
        color: var(--main-font-color);
        margin: 3px 0;
        background-color: var(--bg-color);
        border: 0;
        border-radius: 10px;
        :hover {
          background-color: var(--sec-color);
        }
      }
    }
    .nickname-input {
      display: flex;
      padding: 10px;
      input {
        margin-left: 10px;
        border-radius: 5px;
        padding-left: 10px;
        ::placeholder {
          color: var(--sec-color);
          font-weight: 500;
        }
      }
    }
    .gender-select {
      display: flex;
      padding: 10px;
      .gender-button {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        margin-left: 24px;
        button {
          flex-grow: 1;
          line-height: 10px;
          background-color: white;
          border: 0;
          border-radius: 10px;
          color: var(--sec-color);
          font-weight: 500;
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
    }
    .age-select {
      display: flex;
      padding: 10px;
    }
  }
  .address-container {
    text-align: left;
    input {
      width: 100%;
      height: 30px;
      border: 1px solid #b7a69e;
      border-radius: 5px;
      padding-left: 10px;
      ::placeholder {
        color: var(--sec-color);
        font-weight: 500;
      }
    }
    textarea {
      width: 100%;
      resize: none;
      height: 100px;
      border: 1px solid #b7a69e;
      border-radius: 5px;
      padding: 10px 0 0 10px;
      ::placeholder {
        color: var(--sec-color);
        font-weight: 500;
      }
    }
  }
`;

const EditMemberInfoCard = ({ Modal, MemberInfo }) => {
  const [genderSelect, setGenderSelect] = useState('');
  const [profile, setProfile] = useState(null);
  const ImgRef = useRef();
  const FileValue = 'image';
  //버튼 누르면 인풋 연결
  const handleImgUpload = () => {
    ImgRef.current.click();
  };
  //인풋에서 이미지 업로드 시 스테이트 변경
  const handleImgChange = (e) => {
    if (e.target.files === undefined) {
      return;
    }
    //파일 확장자 , 크기 걸러줌
    if (!e.target.files[0].type.includes(FileValue)) {
      alert('허용된 확장자가 아닙니다.');
    } else if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert('최대 파일 용량은 5MB입니다.');
    } else {
      setProfile(e.target.files[0]);
    }
  };
  console.log(profile);

  return (
    <SInputInfoContainer>
      <div className="title">집사 정보 입력</div>
      <div className="input-container">
        <div className="image-container">
          <div>{Modal ? <img src={MemberInfo.profileImage} alt="" /> : ''}</div>
          <button onClick={handleImgUpload}>이미지 업로드</button>
          <input
            type="file"
            className="Img-upload"
            ref={ImgRef}
            onChange={handleImgChange}
          ></input>
          <button>이미지 삭제</button>
        </div>
        <div>
          <div className="nickname-input">
            <div>닉네임</div>
            <input
              placeholder="닉네임"
              value={Modal ? MemberInfo.nickName : ''}
            ></input>
          </div>
          <div className="gender-select">
            <div>성별</div>
            <div className="gender-button">
              <button
                className={genderSelect === 'M' ? 'selected' : ''}
                onClick={() => {
                  setGenderSelect('M');
                }}
              >
                남
              </button>
              <button
                className={genderSelect === 'W' ? 'selected' : ''}
                onClick={() => {
                  setGenderSelect('W');
                }}
              >
                여
              </button>
            </div>
          </div>
          <div className="age-select">
            <div>나이</div>
            <SelectAge />
          </div>
        </div>
      </div>
      <div className="address-container">
        <div>주소</div>
        <input
          placeholder="주소를 검색하세요"
          value={Modal ? MemberInfo.address : ''}
        ></input>
        <div>인사말</div>
        <textarea
          placeholder="인사말을 입력하세요"
          value={Modal ? MemberInfo.aboutMe : ''}
        ></textarea>
      </div>
    </SInputInfoContainer>
  );
};

export default EditMemberInfoCard;
