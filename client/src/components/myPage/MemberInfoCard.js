import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import ProfileImage from '../common/ProfileImage';
import { RowCenterBox } from '../FlexBoxs';
import selectAgeList from '../../static/selectAgeList';

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

const MemberInfoCard = ({ memberInfo }) => {
  const ageTitle = selectAgeList.find(
    (el) => el.value === memberInfo.memberAge
  )?.title;

  return (
    <CardContainer>
      <ProfileImage
        src={memberInfo?.profileImage?.upFileUrl}
        name={memberInfo.nickName}
        size="100px"
      />
      <div className="user-name">{memberInfo.nickName}</div>
      <UsefInfoWrapper>
        <div>
          <RowCenterBox>
            <BsFillPersonFill />
            정보
          </RowCenterBox>
          <span>{ageTitle}</span>
          <span>/</span>
          <span>{memberInfo.gender === 'M' ? '남' : '여'}</span>
        </div>
        <div>
          <RowCenterBox>
            <IoLocationSharp />
            <span>지역</span>
          </RowCenterBox>
          <span>{memberInfo.fullAddress}</span>
        </div>
      </UsefInfoWrapper>
      <div className="user-introduce">{memberInfo.aboutMe}</div>
    </CardContainer>
  );
};

MemberInfoCard.defaultProps = {
  memberInfo: {
    profileImage:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    nickName: '',
    memberAge: 'TEENS',
    gender: 'M',
    address: '',
    aboutMe: '',
  },
};

export default MemberInfoCard;
