import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import styled from 'styled-components';
import HeaderMyPageBox from './HeaderMyPageBox';

const SHeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--main-font-color);

  > a {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  > a:hover {
    background-color: var(--bg-dark-color);
  }

  .login-btn {
    color: var(--main-color);
    outline: 1px solid var(--main-color);
    font-weight: 500;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
`;

const HeaderNav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const AccessToken = localStorage.getItem('AccessToken');
  const dispatch = useDispatch();
  const handleLoginClick = () =>
    dispatch(openModal({ type: 'login', props: { setIsLogin } }));

  if (isLogin || AccessToken)
    return (
      <SHeaderNav>
        <Link to={'/mate'}>메이트 찾기</Link>
        <Link to={'/chat'}>채팅</Link>
        <HeaderMyPageBox setIsLogin={setIsLogin} />
      </SHeaderNav>
    );
  else
    return (
      <SHeaderNav>
        <Link to={'/mate'}>메이트 찾기</Link>
        <button className="login-btn" onClick={handleLoginClick}>
          로그인
        </button>
      </SHeaderNav>
    );
};

export default HeaderNav;
