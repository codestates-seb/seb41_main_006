import styled from 'styled-components';
import Container from '../components/Container';
import BoardInfo from '../components/myPage/BoardInfo';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import MemberInfo from '../components/myPage/MemberInfo';
import PetInfo from '../components/myPage/PetInfo';

const SContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--main-font-color);
  .Tap-container {
    margin: 10% 0 5% 0;
    width: 70%;
    display: flex;
    justify-content: space-around;
    height: 5%;
  }
`;
const TabLink = styled(Link)`
  background-color: rgba(167, 150, 137, 0.4);
  width: 15%;
  border: none;
  text-align: center;
  border-radius: 5px;
  height: 25px;
  cursor: pointer;
  :visited {
    color: var(--main-font-color);
  }
  :hover {
    background-color: var(--main-font-color);
    color: white;
  }
  &.focus {
    background-color: var(--main-font-color);
    color: white;
  }
`;

const MyPage = () => {
  const { pathname } = useLocation();
  return (
    <>
      <SContainer>
        <div className="Tap-container">
          <TabLink
            className={
              pathname === '/mypage' || pathname === '/mypage/memberInfo'
                ? 'focus'
                : ''
            }
            to="memberInfo"
          >
            나의 정보
          </TabLink>
          <TabLink
            className={pathname === '/mypage/petInfo' ? 'focus' : ''}
            to="petInfo"
          >
            강아지 정보
          </TabLink>
          <TabLink
            className={pathname === '/mypage/myBoards' ? 'focus' : ''}
            to="myBoards"
          >
            나의 모임
          </TabLink>
          <TabLink>알림</TabLink>
        </div>
        <Routes>
          <Route path="/" element={<MemberInfo />}></Route>
          <Route path="memberInfo" element={<MemberInfo />}></Route>
          <Route path="petInfo" element={<PetInfo />}></Route>
          <Route path="myBoards" element={<BoardInfo />}></Route>
        </Routes>
      </SContainer>
    </>
  );
};

export default MyPage;
