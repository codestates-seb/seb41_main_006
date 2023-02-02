import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getMemberList } from '../../api/member/member';
import styled from 'styled-components';
import MateMemberCard from './MateMemberCard';
import { GrayDog } from '../common/DogSvg';
import { media } from '../../style/styleUtils';

const MemberList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  ${media.desktop`
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1.5rem;
    grid-row-gap: 2rem;
  `};
  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1.5rem;
    grid-row-gap: 2rem;
  `};
  ${media.mobile`
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 1.5rem;
    grid-row-gap: 2rem;
  `};
`;

const NoMemberBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  > .dog-face {
    width: 13rem;
    height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .no-pets-msg {
    color: var(--main-font-color);
    margin-bottom: 1rem;
    font-weight: 500;
  }
`;

const MateMemberList = () => {
  const { code } = useSelector((state) => state.address);
  const { data: memberList, isLoading } = useQuery(
    ['members', code],
    async () => await getMemberList({ page: 1, size: 10, placeCode: code }),
    {
      placeholderData: [],
    }
  );

  if (isLoading) {
    <div>loading...</div>;
  }

  if (!memberList || memberList.length === 0) {
    return (
      <NoMemberBox>
        <div className="no-pets-msg">
          주소에 해당하는 산책 메이트가 없습니다!
        </div>
        <div className="dog-face">
          <GrayDog></GrayDog>
        </div>
      </NoMemberBox>
    );
  }

  return (
    <MemberList>
      {memberList.map((el) => (
        <li key={el.memberId}>
          <MateMemberCard member={el} />
        </li>
      ))}
    </MemberList>
  );
};

export default MateMemberList;
