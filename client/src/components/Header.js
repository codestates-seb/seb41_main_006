import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexRowCenter, flexColCenter } from '../style/styleVariable';

const SHeader = styled.header`
  ${flexColCenter}
  z-index: 10;
  background-color: #fbf7f2;
  height: var(--header-height);
  color: var(--main-font-color);
  width: 100%;
  position: fixed;
  border-bottom: 2px solid var(--bg-dark-color);
`;

const HeaderContainer = styled.div`
  ${flexRowCenter}
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 0 1rem;

  a {
    color: var(--main-font-color);
  }

  .logo {
    font-size: 2rem;
    font-weight: 700;
    > span {
      color: var(--main-color);
    }
  }
`;

const HeaderNav = styled.nav`
  ${flexRowCenter}
  gap: 1rem;

  a {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }

  a:hover {
    background-color: var(--bg-dark-color);
  }

  button {
    color: var(--main-color);
    outline: 1px solid var(--main-color);
    font-weight: 500;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
`;

const Header = () => {
  return (
    <SHeader>
      <HeaderContainer>
        <Link className="logo" to={'/'}>
          <span>킁킁</span>메이트
        </Link>
        <HeaderNav>
          <Link to={'/mate'}>메이트 찾기</Link>
          <Link to={'/chat'}>채팅</Link>
          <button>로그인</button>
        </HeaderNav>
      </HeaderContainer>
    </SHeader>
  );
};

export default Header;
