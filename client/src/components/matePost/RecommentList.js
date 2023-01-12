import styled from 'styled-components';
import { dummyRecomments } from '../../static/dummyData';
import Recomment from './Recomment';

const CommentList = styled.ul`
  width: 720px;
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-column-gap: 1.25rem; */
  /* grid-row-gap: 1.5rem; */
  background-color: #ede9e1;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 10px;
  padding: 12px 0 0 16px;
`;

const CommentItem = styled.li`
  /* height: 13.75rem; */
  height: 100%;
  margin-bottom: 28px;
  /* border-bottom: 1px solid #a79689; */
`;

const RecommentList = () => {
  return (
    <CommentList>
      {dummyRecomments.map((el) => (
        <CommentItem key={el.id}>
          <Recomment post={el} />
        </CommentItem>
      ))}
    </CommentList>
  );
};

export default RecommentList;
