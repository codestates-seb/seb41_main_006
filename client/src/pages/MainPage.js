import MainFirstPage from '../components/MainPage/MainFirstPage';
import MainSecondPage from '../components/MainPage/MainSecondPage';
import Container from '../components/Container';
import styled from 'styled-components';
import MainThirdPage from '../components/MainPage/MainThirdPage';
import Footer from '../components/Footer';

const SContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const MainPage = () => {
  return (
    <SContainer>
      <MainFirstPage />
      <MainSecondPage />
      <MainThirdPage />
      <Footer />
    </SContainer>
  );
};

export default MainPage;
