import styled from 'styled-components';
import Recomment from './Recomment';
import AddRecomment from './AddRecomment';

const RecommList = styled.ul`
  width: 700px;
  background-color: #ede9e1;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 10px;
  padding: 12px 16px;
`;

const RecommentItem = styled.li`
  height: 100%;
  margin-top: 28px;
`;

const RecommentList = ({ recomments, parentId }) => {
  return (
    <RecommList>
      <AddRecomment parentId={parentId} />
      {recomments.map((el) => (
        <RecommentItem key={el.commentsId}>
          <Recomment recomment={el} />
        </RecommentItem>
      ))}
    </RecommList>
  );
};

export default RecommentList;
