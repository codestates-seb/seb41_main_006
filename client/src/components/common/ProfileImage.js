import styled, { css } from 'styled-components';
import { CenterBox } from '../FlexBoxs';

const ProfileBox = styled(CenterBox)`
  img {
    ${({ size }) => {
      return css`
        width: ${size};
        height: ${size};
        border-radius: ${size};
        box-shadow: 0 4px 4px rgba(1, 1, 1, 0.2);
      `;
    }}
  }
`;

/**
 * 원형의 profile 이미지를 반환
 */
const ProfileImage = ({ size, src, name }) => {
  return (
    <ProfileBox size={size}>
      <img src={src} alt={`${name}'s profile`}></img>
    </ProfileBox>
  );
};

ProfileImage.defaultProps = {
  size: '16px',
  name: 'user',
  src: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
};

export default ProfileImage;
