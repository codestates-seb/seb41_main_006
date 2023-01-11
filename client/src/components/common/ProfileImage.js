import styled, { css } from 'styled-components';
import { CenterBox } from '../FlexBoxs';

const ProfileBox = styled(CenterBox)`
  img {
    ${({ size }) => {
      return css`
        width: ${size};
        height: ${size};
        border-radius: ${size};
      `;
    }}
  }
`;

const ProfileImage = ({ size, src, name }) => {
  return (
    <ProfileBox size={size}>
      <img src={src} alt={`${name}'s profile`}></img>
    </ProfileBox>
  );
};

ProfileImage.defaultProps = {
  size: '16px',
};
export default ProfileImage;
