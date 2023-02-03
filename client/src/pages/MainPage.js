import MainFirstPage from '../components/MainPage/MainFirstPage';
import MainSecondPage from '../components/MainPage/MainSecondPage';
import Container from '../components/Container';
import styled from 'styled-components';
import MainThirdPage from '../components/MainPage/MainThirdPage';
import Footer from '../components/Footer';
import { ColCenterBox } from '../components/FlexBoxs';

const SContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;
const MainContainer = styled(ColCenterBox)`
  width: 100%;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <SContainer>
        <MainFirstPage />
        <MainSecondPage />
        <MainThirdPage />
      </SContainer>
      <Footer />
    </MainContainer>
  );
};

export default MainPage;
