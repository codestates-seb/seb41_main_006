import styled, { css } from 'styled-components';
import { CenterBox } from '../FlexBoxs';
import DogProfile from './DogProfile';

const PetProfileBox = styled(CenterBox)`
  background-color: white;
  width: max-content;
  height: max-content;
  padding: 1rem;
  svg {
    width: ${({ width }) => width || '100px'};
    height: ${({ height }) => height || '150px'};
  }

  img {
    width: ${({ width }) => width || '100px'};
    height: ${({ height }) => height || '150px'};
  }

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: 0 4px 4px rgba(1, 1, 1, 0.2);
    `}
`;

/**
 * 원형의 profile 이미지를 반환
 */
const PetProfileImage = ({ width, height, src, name, shadow }) => {
  if (!src) {
    return (
      <PetProfileBox width={width} height={height} shadow={shadow}>
        <DogProfile />
      </PetProfileBox>
    );
  }
  return (
    <PetProfileBox width={width} height={height} shadow={shadow}>
      <img src={src} alt={`${name}'s profile`}></img>
    </PetProfileBox>
  );
};

PetProfileImage.defaultProps = {
  size: '20px',
  name: 'user',
};

export default PetProfileImage;
