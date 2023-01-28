import styled, { css } from 'styled-components';
import { CenterBox } from '../FlexBoxs';
import DogProfile from './DogProfile';

const PetProfileBox = styled(CenterBox)`
  background-color: white;
  width: 100%;
  height: 100%;

  svg,
  img {
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    object-fit: cover;
    ${(props) =>
      props.circle &&
      css`
        border-radius: 100%;
      `}
  }

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: 0 4px 4px rgba(1, 1, 1, 0.2);
    `}
`;

const PetProfileImage = ({ width, height, src, name, shadow, circle }) => {
  if (!src) {
    return (
      <PetProfileBox
        width={width}
        height={height}
        shadow={shadow}
        circle={circle}
      >
        <DogProfile />
      </PetProfileBox>
    );
  }
  return (
    <PetProfileBox
      width={width}
      height={height}
      shadow={shadow}
      circle={circle}
    >
      <img src={src} alt={`${name}'s profile`}></img>
    </PetProfileBox>
  );
};

PetProfileImage.defaultProps = {
  name: 'pet',
};

export default PetProfileImage;
