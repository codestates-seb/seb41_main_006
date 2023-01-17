import styled from 'styled-components';
import MateUserCard from './MateUserCard';
import dummyMembers from '../../api/dummyData/dummyMembers';

const UserList = styled.ul`
  width: 90%;
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem; */
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

const UserItem = styled.li`
  height: 20rem;
`;

const MateUserList = () => {
  return (
    <UserList>
      <button>이전</button>
      {dummyMembers.map((el) => (
        <UserItem key={el.id}>
          <MateUserCard user={el} />
        </UserItem>
      ))}
      <button>다음</button>
    </UserList>
  );
};

export default MateUserList;
