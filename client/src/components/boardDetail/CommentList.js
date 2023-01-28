import styled from 'styled-components';
import Comment from './Comment';

const CommentBox = styled.ul`
  width: 720px;
`;

const CommentItem = styled.li`
  /* height: 13.75rem; */
  height: 100%;
  margin-top: 16px;
  border-bottom: 1px solid #ebe6e1;
  padding-bottom: 12px;
`;

const CommentList = ({ comments, getRecomments }) => {
  return (
    <CommentBox>
      {comments?.map((el) => (
        <CommentItem key={el.commentsId}>
          <Comment comment={el} recomments={getRecomments(el.commentsId)} />
        </CommentItem>
      ))}
    </CommentBox>
  );
};

// CommentList.defaultProps = {
//   comments: [],
// };

export default CommentList;
