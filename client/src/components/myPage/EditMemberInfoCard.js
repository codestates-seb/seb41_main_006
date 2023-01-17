import styled from 'styled-components';
import { useState } from 'react';
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

const EditMemberInfoCard = () => {
  const [genderSelect, setGenderSelect] = useState([false, false]);
  return (
    <SInputInfoContainer>
      <div className="title">집사 정보 입력</div>
      <div className="input-container">
        <div className="image-container">
          <div></div>
          <button>이미지 업로드</button>
          <button>이미지 삭제</button>
        </div>
        <div>
          <div className="nickname-input">
            <div>닉네임</div>
            <input placeholder="닉네임"></input>
          </div>
          <div className="gender-select">
            <div>성별</div>
            <div className="gender-button">
              <button
                className={genderSelect[0] ? 'selected' : ''}
                onClick={() => {
                  setGenderSelect([true, false]);
                }}
              >
                남
              </button>
              <button
                className={genderSelect[1] ? 'selected' : ''}
                onClick={() => {
                  setGenderSelect([false, true]);
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
        <input placeholder="주소를 검색하세요"></input>
        <div>인사말</div>
        <textarea placeholder="인사말을 입력하세요"></textarea>
      </div>
    </SInputInfoContainer>
  );
};

export default EditMemberInfoCard;
