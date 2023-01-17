import styled from 'styled-components';
import MateMemberCard from './MateMemberCard';
import { dummyUsers } from '../../static/dummyData';

const UserList = styled.ul`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
`;

const UserItem = styled.li`
  height: 20rem;
`;
const MateMemberList = () => {
  return (
    <UserList>
      {dummyUsers.map((el) => (
        <UserItem key={el.id}>
          <MateMemberCard user={el} />
        </UserItem>
      ))}
    </UserList>
  );
};

export default MateMemberList;
