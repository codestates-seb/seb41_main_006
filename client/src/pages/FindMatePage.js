import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import SearchAddressBox from '../components/findMate/SearchAddressBox';

const FindMateContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FindMateHeader = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    width: 100%;
    color: var(--main-font-color);
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  div {
    width: 100%;
  }

  h2 {
    color: var(--main-font-color);
    font-size: 1.25rem;
  }
`;

const FindMatePage = () => {
  const [address, setAddress] = useState('');

  return (
    <FindMateContainer>
      <FindMateHeader>
        <h1>어떤 지역에서 찾고 싶으신가요?</h1>
        <SearchAddressBox address={address} setAddress={setAddress} />
        <h2>{address}</h2>
      </FindMateHeader>
      <div>
        <div>
          <Link to="users">산책 메이트</Link>
          <Link to="posts">산책 모임</Link>
        </div>
        <Routes>
          <Route path="users" element={<div>유저</div>}></Route>
          <Route path="posts" element={<div>글</div>}></Route>
          <Route path="*" element={<div>유저</div>}></Route>
        </Routes>
      </div>
    </FindMateContainer>
  );
};

export default FindMatePage;
