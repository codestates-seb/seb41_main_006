import styled from 'styled-components';
import ModalBackDrop from '../ModalBackDrop';
import Title from '../common/Title';
import Button from '../common/Button';
import DogFootLoading from '../DogFootLoading';
import useInput from '../../hooks/useInput';
import { authEmailVerification, authEmail } from '../../api/auth/signup';

const EmailAuthModalView = styled.div`
  width: 30rem;
  height: 23rem;
  background-color: white;
  padding: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > .auth-guide {
    color: var(--main-font-color);
    font-size: 1rem;
    > span {
      color: var(--main-color);
      font-weight: 500;
    }
  }
`;

const EmailAuthInputBox = styled.div`
  width: 100%;
  > input {
    width: 100%;
    border: 1px solid rgb(167, 150, 137, 0.4);
    border-radius: 10rem;
    padding: 0.675rem;
    font-size: 2rem;
    text-align: center;
    color: var(--main-font-color);
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    > .error {
      color: var(--error-color);
      text-align: center;
      font-size: 0.875rem;
    }
    > button {
      color: var(--main-font-color);
      text-decoration: underline;
      text-underline-position: under;
      font-size: 0.875rem;
      font-weight: 500;
    }
  }
`;

const EmailAuthModal = ({
  email,
  setIsEmailAuthModalOpen,
  setIsEmailVerified,
  isEmailLoading,
  setIsEmailLoading,
}) => {
  const emailAuthNumber = useInput('');

  const handleEmailAuthSubmit = async () => {
    // 인증번호가 없을 경우
    if (!emailAuthNumber.value) {
      emailAuthNumber.setError('인증번호를 입력해주세요');
      return;
    }

    try {
      await authEmailVerification({ code: emailAuthNumber.value, email });
      // 인증 완료
      setIsEmailVerified(true);
      alert('인증이 완료되었습니다.');
      setIsEmailAuthModalOpen(false);
    } catch (err) {
      if (err.response.data.message === 'Code Has Not Matched') {
        emailAuthNumber.setError('인증번호가 맞지 않습니다.');
      }
    }
    // 인증 번호가 맞지 않을 때의 경우 추가되어야 함!
  };

  const handleReSendEmail = async () => {
    // 이메일 요청 중이라면..
    if (isEmailLoading) return;

    setIsEmailLoading(true);
    try {
      await authEmail(email);
      alert('해당 메일로 인증 메일을 전송했습니다.');
    } catch (error) {
      console.log(error);
    }
    setIsEmailLoading(false);
  };

  return (
    <ModalBackDrop onClick={() => setIsEmailAuthModalOpen(false)}>
      <EmailAuthModalView onClick={(e) => e.stopPropagation()}>
        {isEmailLoading ? (
          <DogFootLoading size="2rem" />
        ) : (
          <>
            <Title as="h2">인증 번호 입력</Title>
            <div className="auth-guide">
              <span>{email}</span>로 인증 메일이 전송되었습니다.
              <div>인증 번호를 입력한 후 완료를 눌러주세요.</div>
            </div>
            <EmailAuthInputBox>
              <input
                value={emailAuthNumber.value}
                type="text"
                onChange={emailAuthNumber.handleChange}
              ></input>
              <div>
                <span className="error">{emailAuthNumber.error}</span>
                <button type="button" onClick={handleReSendEmail}>
                  인증번호 재전송
                </button>
              </div>
            </EmailAuthInputBox>
            <Button onClick={handleEmailAuthSubmit} type="button">
              완료
            </Button>
          </>
        )}
      </EmailAuthModalView>
    </ModalBackDrop>
  );
};

export default EmailAuthModal;
