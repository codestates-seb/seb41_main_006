import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexRowCenter, flexColCenter } from '../style/styleVariable';
import HeaderNav from './header/HeaderNav';

const SHeader = styled.header`
  ${flexColCenter}
  z-index: 20;
  background-color: #fbf7f2;
  height: var(--header-height);
  color: var(--main-font-color);
  width: 100%;
  position: fixed;
  border-bottom: 2px solid var(--bg-dark-color);
`;

const HeaderContainer = styled.div`
  position: relative;
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

const Header = () => {
  return (
    <SHeader>
      <HeaderContainer>
        <Link className="logo" to={'/'}>
          <span>킁킁</span>메이트
        </Link>
        <HeaderNav />
      </HeaderContainer>
    </SHeader>
  );
};

export default Header;
