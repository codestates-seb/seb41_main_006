import styled from 'styled-components';
import MateMemberCard from './MateMemberCard';

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
  width: 15rem;
`;

const MateMemberList = ({ memberList }) => {
  if (memberList.length === 0) {
    return <div>지금은 회원 정보가 없습니다.</div>;
  }

  console.log(memberList);
  return (
    <UserList>
      {memberList.map((el) => (
        <UserItem key={el.memberId}>
          <MateMemberCard member={el} />
        </UserItem>
      ))}
    </UserList>
  );
};

export default MateMemberList;
