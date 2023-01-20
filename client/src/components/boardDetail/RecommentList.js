import styled from 'styled-components';
import Recomment from './Recomment';
import AddComment from './AddComment';

const RecommList = styled.ul`
  width: 700px;
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-column-gap: 1.25rem; */
  /* grid-row-gap: 1.5rem; */
  background-color: #ede9e1;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 10px;
  padding: 12px 16px;
`;

const RecommentItem = styled.li`
  /* height: 13.75rem; */
  height: 100%;
  margin-top: 28px;
  /* border-bottom: 1px solid #a79689; */
`;

const RecommentList = ({ recomments }) => {
  return (
    <RecommList>
      <AddComment />
      {recomments.map((el) => (
        <RecommentItem key={el.id}>
          <Recomment recomment={el} />
        </RecommentItem>
      ))}
    </RecommList>
  );
};

export default RecommentList;
