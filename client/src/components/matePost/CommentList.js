import styled from 'styled-components';
import { dummyComments } from '../../api/dummyData/dummyData';
import Comment from './Comment';

const CommentBox = styled.ul`
  width: 720px;
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-column-gap: 1.25rem; */
  /* grid-row-gap: 1.5rem; */
`;

const CommentItem = styled.li`
  /* height: 13.75rem; */
  height: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid #ebe6e1;
  padding-bottom: 12px;
`;

const CommentList = () => {
  return (
    <CommentBox>
      {dummyComments.map((el) => (
        <CommentItem key={el.id}>
          <Comment post={el} />
        </CommentItem>
      ))}
    </CommentBox>
  );
};

export default CommentList;
