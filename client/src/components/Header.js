import styled from 'styled-components';
import { Link } from 'react-router-dom';
const SHeader = styled.header`
  z-index: 10;
  background-color: #fbf7f2;
  height: var(--header-height);
  color: var(--main-font-color);
  width: 100%;
  position: fixed;
`;

const Header = () => {
  return (
    <SHeader>
      <Link to={'/'}>메인</Link>
      <Link to={'/mate'}>메이트 찾기</Link>
    </SHeader>
  );
};

export default Header;
