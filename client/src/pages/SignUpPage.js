import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import SignUp from '../components/signup/SignUp';
import MemberInfoInput from '../components/signup/MemberInfoInput';
import useInput from '../hooks/useInput';
// import EditMemberInfoCard from '../components/myPage/EditMemberInfoCard';

const SignUpContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  // value 지정
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');

  useEffect(() => {
    // 이메일과 패스워드가 없는 상태라면 멤버 정보 입력 화면 진입 불가
    if (!email.value || !password.value) {
      navigate('/signup');
    }
  }, []);

  return (
    <SignUpContainer>
      <Routes>
        <Route
          path="memberInfo"
          element={
            <MemberInfoInput
              isEditMode={false}
              auth={{ email: email.value, password: password.value }}
            />
          }
        ></Route>
        <Route
          path="*"
          element={
            <SignUp
              email={email}
              password={password}
              confirmPassword={confirmPassword}
            />
          }
        ></Route>
      </Routes>
      {/* <EditMemberInfoCard /> */}
    </SignUpContainer>
  );
};

export default SignUpPage;
