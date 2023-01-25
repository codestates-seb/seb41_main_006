import { Link, useLocation, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import BoardInfo from '../components/myPage/BoardInfo';
import MemberInfo from '../components/myPage/MemberInfo';
import PetInfo from '../components/myPage/PetInfo';
import dummyMembers from '../api/member/dummyMembers';

const SContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  color: var(--main-font-color);

  .tap-container {
    width: 70%;
    display: flex;
    justify-content: space-around;
    height: 5%;
    margin-bottom: 2.5rem;
  }
`;

const TabLink = styled(Link)`
  background-color: rgba(167, 150, 137, 0.4);
  width: 10rem;
  border: none;
  text-align: center;
  border-radius: 5px;
  height: 1.5rem;
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
        <div className="tap-container">
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
          <Route
            path="petInfo"
            element={<PetInfo petList={dummyMembers.data[1].pets} />}
          ></Route>
          <Route
            path="myBoards"
            element={<BoardInfo memberId={dummyMembers.data[1].memberId} />}
          ></Route>
        </Routes>
      </SContainer>
    </>
  );
};

export default MyPage;
