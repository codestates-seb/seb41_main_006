import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useState } from 'react';

const SignUpContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const SInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 20%;
  height: 50%;
  margin-top: 100px;
  .title {
    color: var(--main-font-color);
    font-size: 2rem;
    font-weight: 500;
  }
  .text-container {
    display: flex;
    justify-content: center;
    div {
      margin-right: 30px;
      color: #a5a5a5;
    }
  }
  input {
    height: 40px;
    margin: 15px 0;
    border: 1px solid #b7a69e;
    border-radius: 10px;
    padding-left: 5px;
    outline: none;
  }
  .email-certi {
    display: flex;
    align-items: center;
    justify-content: right;
    button {
      position: absolute;
      border: none;
      background-color: white;
      margin-right: 10px;
      color: var(--main-color);
    }
    input {
      width: 100%;
      padding-right: 35%;
    }
  }
  .CheckNumber {
    height: 20px;
    width: 50%;
  }
`;
const NextButton = styled(Link)`
  line-height: 40px;
  border: 0;
  border-radius: 10px;
  background-color: var(--main-color);
  color: white;
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const SLink = styled(Link)`
  text-decoration: none;
  :visited,
  :link {
    color: #ad8b73;
  }
`;
const CheckContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    color: var(--main-color);
    height: 10%;
    border-radius: 2px;
    :hover {
      background-color: var(--main-font-color);
      color: white;
    }
  }
`;

const CheckNumber = () => {
  return (
    <CheckContainer>
      <input className="CheckNumber" placeholder="인증번호"></input>
      <button>인증 확인</button>
      <button>재전송</button>
    </CheckContainer>
  );
};

const SignUpPage = () => {
  const [isEmail, setIsEmail] = useState(false);
  return (
    <SignUpContainer>
      <SInputContainer>
        <div className="title">회원가입</div>
        <div className="email-certi">
          <input placeholder="이메일"></input>
          <button
            onClick={() => {
              setIsEmail(true);
            }}
          >
            인증번호 발송
          </button>
        </div>
        {isEmail ? <CheckNumber /> : ''}
        <input type="password" placeholder="비밀번호"></input>
        <input type="password" placeholder="비밀번호 확인"></input>
        <NextButton className="submit-button" to="/inputuserinfo">
          시작
        </NextButton>
        <div className="text-container">
          <div>회원이신가요?</div>
          <SLink>로그인</SLink>
        </div>
      </SInputContainer>
    </SignUpContainer>
  );
};

export default SignUpPage;
