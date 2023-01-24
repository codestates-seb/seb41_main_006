import { IoPawSharp } from 'react-icons/io5';
import styled from 'styled-components';

const DogFootLoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  height: max-content;
  color: var(--main-font-color);
  font-size: ${({ size }) => size || '1rem'};

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
const DogFootLoading = ({ size }) => {
  return (
    <DogFootLoadingBox size={size}>
      <IoPawSharp />
      <IoPawSharp />
      <IoPawSharp />
    </DogFootLoadingBox>
  );
};

export default DogFootLoading;
