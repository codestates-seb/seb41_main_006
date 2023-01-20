import styled from 'styled-components';
import { ColCenterBox, RowCenterBox } from '../FlexBoxs';
import ProfileImage from '../common/ProfileImage.js';
import Title from '../common/Title';

const UserCard = styled(ColCenterBox)`
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1.6rem 1rem;
  color: var(--main-font-color);
  border-radius: 20px;
`;

const UserCardHeader = styled(ColCenterBox)`
  .user-card--userName {
    margin-top: 0.5rem;
    span {
      color: var(--main-color);
      font-weight: 600;
    }
  }
`;

const UserCardBody = styled(ColCenterBox)`
  color: var(--sec-color);
  .user-card--about {
    color: var(--main-font-color);
    font-weight: 600;
    margin: 0.8rem;
  }
`;

const MateMemberCard = ({ member }) => {
  return (
    <UserCard>
      <UserCardHeader>
        <ProfileImage
          size="85px"
          src={member.ProfileImage}
          name={member.user}
        />
        <div className="user-card--userName">
          <span>{member.nickName}</span>
          님의 강아지
        </div>
        <Title as="h4" size="small">
          {member.petName}
        </Title>
      </UserCardHeader>
      <UserCardBody>
        <span>내용 수정 필요</span>
        <RowCenterBox>
          <span>{member.petBreed}</span>
          <span>{member.petAge}세</span>
          <span>{member.petGender}</span>
          {member.petNeutered ? <span>중성화 O</span> : <span>중성화 X</span>}
        </RowCenterBox>
        <p className="user-card--about">{member.aboutDog}</p>
      </UserCardBody>
    </UserCard>
  );
};

export default MateMemberCard;
