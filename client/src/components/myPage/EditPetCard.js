import styled from 'styled-components';
import { useState } from 'react';

const SinfoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4%;
  .img-container {
    display: flex;
    flex-direction: column;
    margin: 2% 5%;
    img {
      height: 20rem;
    }
    .img-button {
      display: flex;
      margin-top: 2%;
      justify-content: space-around;
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
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--main-font-color);
  }
`;

const EditPetCard = () => {
  const [genderSelect, setGenderSelect] = useState([false, false]);
  return (
    <>
      <h2>강아지 정보 수정</h2>
      <SinfoContainer>
        <div className="img-container">
          <img
            src="https://i.ibb.co/Rj5b3xs/Kakao-Talk-Photo-2023-01-12-00-46-38.jpg"
            alt=""
          />
          <div className="img-button">
            <button>이미지 업로드</button>
            <button>이미지 삭제</button>
          </div>
        </div>
        <div className="detail-info">
          <div className="name-input">
            <div>이름</div>
            <input></input>
            <div>나이</div>
            <input className="age-input"></input>
          </div>
          <div className="gender-button">
            <div>성별</div>
            <button
              className={genderSelect[0] ? 'selected' : ''}
              onClick={() => {
                setGenderSelect([true, false]);
              }}
            >
              수컷
            </button>
            <button
              className={genderSelect[1] ? 'selected' : ''}
              onClick={() => {
                setGenderSelect([false, true]);
              }}
            >
              암컷
            </button>
            <Scheckbox type="checkbox" />
            <span>중성화 여부</span>
          </div>
          <div className="breed-input">
            <div>견종</div>
            <input></input>
          </div>
          <div className="etc-input">
            <div>특이사항</div>
            <textarea></textarea>
          </div>
        </div>
      </SinfoContainer>
    </>
  );
};

export default EditPetCard;
