import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getMemberList } from '../../api/member/member';
import styled from 'styled-components';
import MateMemberCard from './MateMemberCard';

const MemberList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  overflow-x: scroll;
  // 스크롤바 가리기
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  gap: 1.5rem;
  padding-bottom: 3rem;
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

  if (memberList.length === 0) {
    return <div>지금은 회원 정보가 없습니다.</div>;
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
