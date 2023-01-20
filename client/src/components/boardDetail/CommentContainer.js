import AddComment from './AddComment';
import CommentList from './CommentList';

const CommentContainer = ({ comments }) => {
  const rootComments = comments.filter((el) => el.depth === 0);
  const getRecomments = (commentId) => {
    return comments.filter((el) => commentId === el.parentId);
  };
  return (
    <div>
      <h3>댓글 {rootComments.length}개</h3>
      <AddComment />
      <CommentList comments={rootComments} getRecomments={getRecomments} />
    </div>
  );
};

export default CommentContainer;
