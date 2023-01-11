import styled from 'styled-components';
import MateUserCard from './MateUserCard';
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
const MateUserList = () => {
  return (
    <UserList>
      {dummyUsers.map((el) => (
        <UserItem key={el.id}>
          <MateUserCard user={el} />
        </UserItem>
      ))}
    </UserList>
  );
};

export default MateUserList;
