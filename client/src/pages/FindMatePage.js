import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';

const FindMateHeader = styled.div`
  h1 {
    color: var(--main-font-color);
    font-size: 1.25rem;
  }
`;

const FindMatePage = () => {
  const [address, setAddress] = useState('');

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <Container>
      <FindMateHeader>
        <h1>어떤 메이트를 찾고 싶으신가요?</h1>
        <div>
          <input type="text" value={address} onChange={handleChange}></input>
          <div>{address}</div>
        </div>
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
    </Container>
  );
};

export default FindMatePage;
