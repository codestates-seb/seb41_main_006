import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

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
    line-height: 40px;
    margin: 15px 0;
    border: 1px solid #b7a69e;
    border-radius: 10px;
    padding-left: 5px;
    outline: none;
  }
  button {
    line-height: 40px;
    border: 0;
    border-radius: 10px;
    background-color: var(--main-color);
    color: white;
    margin: 15px 0;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
  :visited,
  :link {
    color: #ad8b73;
  }
`;

const SignUpPage = () => {
  return (
    <SignUpContainer>
      <SInputContainer>
        <div className="title">회원가입</div>
        <input placeholder="이메일"></input>
        <input type="password" placeholder="비밀번호"></input>
        <input type="password" placeholder="비밀번호 확인"></input>
        <button>시작</button>
        <div className="text-container">
          <div>회원이신가요?</div>
          <SLink>로그인</SLink>
        </div>
      </SInputContainer>
    </SignUpContainer>
  );
};

export default SignUpPage;
