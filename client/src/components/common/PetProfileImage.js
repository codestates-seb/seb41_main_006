import styled, { css } from 'styled-components';
import { CenterBox } from '../FlexBoxs';
import { BrownDog } from './DogSvg';

const PetProfileBox = styled(CenterBox)`
  background-color: var(--bg-color);
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  border-radius: 10px;

  svg,
  img {
    border-radius: 10px;
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    object-fit: cover;
    ${(props) =>
      props.circle &&
      css`
        border-radius: 100%;
      `}
  }

  svg {
    padding: 3rem;
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
        <BrownDog />
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
