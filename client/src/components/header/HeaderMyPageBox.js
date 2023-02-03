import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import styled from 'styled-components';
import Button from '../common/Button';
import { BsFillPersonFill } from 'react-icons/bs';
import { darken } from 'polished';
import { logout } from '../../api/member/login';

const MyPageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-font-color);
`;

const MyPageDropDown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: absolute;
  padding: 1rem;
  border-radius: 10px;
  margin: 0;
  right: 0;
  top: calc(var(--header-height) - 1rem);
  background-color: var(--bg-dark-color);
  width: 10rem;
  color: var(--main-font-color);

  > .mypage-btn {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  > .mypage-btn:hover {
    background: ${darken(0.1, `#EDE9E1`)};
  }
`;

const HeaderMyPageBox = ({ setIsLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const myPageRef = useRef();
  const navigate = useNavigate();

  // dropDown 외부를 클릭하면 마이페이지 dropDown 닫힌다.
  useOnClickOutside(myPageRef, () => setIsOpen(false));
  const handleToggleDropDown = () => setIsOpen(!isOpen);

  const handleClickMyPage = () => {
    navigate('/mypage');
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div ref={myPageRef}>
      <MyPageButton onClick={handleToggleDropDown}>
        <BsFillPersonFill size="28" />
      </MyPageButton>
      <MyPageDropDown className={isOpen ? '' : 'hidden'}>
        <button className="mypage-btn" onClick={handleClickMyPage}>
          마이페이지
        </button>
        <Button
          fullWidth
          outline
          color="second"
          size="small"
          onClick={() => {
            setIsLogin(false);
            setIsOpen(false);
            handleLogout();
          }}
        >
          로그아웃
        </Button>
      </MyPageDropDown>
    </div>
  );
};

export default HeaderMyPageBox;
