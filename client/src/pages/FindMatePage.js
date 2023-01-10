import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import SearchAddressBox from '../components/findMate/SearchAddressBox';
import FindMateTab from '../components/findMate/FindMateTab';

const FindMateContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FindMateTop = styled.div`
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
    font-size: 1.5rem;
  }
`;

const FindMateBottom = styled.div`
  width: 100%;
`;

const FindMatePage = () => {
  const [address, setAddress] = useState('');

  return (
    <FindMateContainer>
      <FindMateTop>
        <h1>어떤 지역에서 찾고 싶으신가요?</h1>
        <SearchAddressBox address={address} setAddress={setAddress} />
        {address ? <h2>{address}</h2> : <h2>송파구 잠실 7동</h2>}
      </FindMateTop>
      <FindMateBottom>
        <FindMateTab />
        <Routes>
          <Route path="users" element={<div>유저</div>}></Route>
          <Route path="posts" element={<div>글</div>}></Route>
          <Route path="*" element={<div>유저</div>}></Route>
        </Routes>
      </FindMateBottom>
    </FindMateContainer>
  );
};

export default FindMatePage;
