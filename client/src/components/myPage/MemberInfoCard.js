import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import ProfileImage from '../common/ProfileImage';
import { RowCenterBox } from '../FlexBoxs';

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--main-font-color);
  font-size: 1rem;

  > .user-name {
    font-size: 1.25rem;
    font-weight: 600;
  }

  > .user-introduce {
    height: max-content;
    text-align: center;
  }
`;

const UsefInfoWrapper = styled.div`
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    > div {
      font-weight: 600;
    }
  }
`;

const MemberInfoCard = ({ userInfo }) => {
  return (
    <CardContainer>
      <ProfileImage
        src={userInfo.profile_img}
        name={userInfo.nickname}
        size="100px"
      />
      <div className="user-name">{userInfo.nickname}</div>
      <UsefInfoWrapper>
        <div>
          <RowCenterBox>
            <BsFillPersonFill />
            정보
          </RowCenterBox>
          <span>{userInfo.age}</span>
          <span>/</span>
          <span>{userInfo.male ? '남' : '여'}</span>
        </div>
        <div>
          <RowCenterBox>
            <IoLocationSharp />
            <span>지역</span>
          </RowCenterBox>
          <span>{userInfo.address}</span>
        </div>
      </UsefInfoWrapper>
      <div className="user-introduce">{userInfo.introduce}</div>
    </CardContainer>
  );
};

export default MemberInfoCard;
