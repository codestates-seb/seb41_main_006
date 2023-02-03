import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';
import SearchAddress from '../components/findMate/SearchAddress';
import FindMateTab from '../components/findMate/FindMateTab';
import MateBoardConent from '../components/findMate/MateBoardContent';
import MateMemberContent from '../components/findMate/MateMemberContent';
import DogFootLoading from '../components/DogFootLoading';
import { media } from '../style/styleUtils';

const FindMateContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const FindMateTop = styled.div`
  width: 50%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile`
    width: 80%
  `}
  > h1 {
    width: 100%;
    color: var(--main-font-color);
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  > h2 {
    color: var(--main-font-color);
    font-size: 1.5rem;

    ${media.mobile`
      font-size: 1.25rem;
  `}
  }
`;

const FindMateBottom = styled.div`
  width: 100%;
`;

const FindMatePage = () => {
  const { address, code } = useSelector((state) => state.address);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FindMateContainer>
      <FindMateTop>
        <SearchAddress setIsLoading={setIsLoading} />
        {isLoading ? <DogFootLoading size="1.3rem" /> : <h2>{address}</h2>}
      </FindMateTop>
      <FindMateBottom>
        <FindMateTab />
        <Routes>
          <Route path="members" element={<MateMemberContent />}></Route>
          <Route
            path="boards"
            element={<MateBoardConent placeCode={code} address={address} />}
          ></Route>
          <Route path="*" element={<MateMemberContent />}></Route>
        </Routes>
      </FindMateBottom>
    </FindMateContainer>
  );
};

export default FindMatePage;
