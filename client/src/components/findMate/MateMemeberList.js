import styled from 'styled-components';
import MateMemberCard from './MateMemberCard';
import dummyMembers from '../../api/member/dummyMembers';

const UserList = styled.ul`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

const UserItem = styled.li`
  height: 20rem;
`;

const MateMemberList = () => {
  return (
    <UserList>
      <button>이전</button>
      {dummyMembers.data.map((el) => (
        <UserItem key={el.memberId}>
          <MateMemberCard member={el} />
        </UserItem>
      ))}
      <button>다음</button>
    </UserList>
  );
};

export default MateMemberList;
