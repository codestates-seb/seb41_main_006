import styled from 'styled-components';
import { IoPawSharp } from 'react-icons/io5';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  gap: 0.5rem;

  > svg:first-child {
    display: inline-block;
    animation: wave 1s infinite;
  }

  > svg:nth-child(2) {
    display: inline-block;
    animation: wave 1s infinite;
    animation-delay: 0.1s;
  }

  > svg:nth-child(3) {
    display: inline-block;
    animation: wave 1s infinite;
    animation-delay: 0.2s;
  }

  @keyframes wave {
    0%,
    40%,
    100% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(-5px);
    }
  }
`;

const PageLoading = () => {
  return (
    <Container>
      <IoPawSharp />
      <IoPawSharp />
      <IoPawSharp />
    </Container>
  );
};

export default PageLoading;
