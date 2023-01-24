import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import SignUp from '../components/signup/SignUp';
import MemberInfoInput from '../components/signup/MemberInfoInput';
import useInput from '../hooks/useInput';
import useForm from '../hooks/useForm';
import memberInfoValidate from '../utils/memberInfoValidate';
import { postNewMember } from '../api/member/member';

// import EditMemberInfoCard from '../components/myPage/EditMemberInfoCard';

const SignUpContainer = styled(Container)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  // value 지정
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const memberInfoForm = useForm({
    initialValues: {
      nickName: '',
      memberAge: '',
      address: '',
      gender: '',
      aboutMe: '',
    },
    onSubmit: () => {
      postNewMember({
        ...memberInfoForm.values,
        email: email.value,
        password: password.value,
      });
      console.log(memberInfoForm.values);
    },
    validate: memberInfoValidate,
  });

  useEffect(() => {
    // 이메일과 패스워드 입력을 안한 상태라면 멤버 정보 입력 화면 진입 불가
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
              memberInfoForm={memberInfoForm}
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
