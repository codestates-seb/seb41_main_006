import styled from 'styled-components';
import Container from '../components/Container';

const PageContainer = styled(Container)`
  background-color: red;
`;

const FindMatePage = () => {
  return <PageContainer>메이트 찾기 페이지</PageContainer>;
};

export default FindMatePage;
