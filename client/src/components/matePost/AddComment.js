import styled from 'styled-components';
// import { dummyComments } from '../../static/dummyData';
import { CommentButton } from '../Button';

const CommentContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  position: relative;

  h3 {
    color: #401809;
    font-size: 20px;
  }

  textarea {
    width: 100%;
    height: 150px;
    resize: none;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #b7a69e;
    border-radius: 10px;

    ::placeholder {
      color: #b7a69e;
    }
  }

  button {
    /* width: 66px; */
    /* height: 33px; */
    /* border-radius: 10px; */
    position: absolute;
    right: 17px;
    bottom: 24px;
    /* background-color: #a79689; */
    /* border: none; */
    /* color: #ffffff; */
    /* font-size: 16px; */
  }
`;

const AddComment = () => {
  return (
    <CommentContainer>
      {/* <div className="comment-cnt">
        <h3>댓글 {dummyComments.length}개</h3>
      </div> */}
      <textarea placeholder="댓글을 작성하세요"></textarea>
      {/* <button>작성</button> */}
      <CommentButton>작성</CommentButton>
    </CommentContainer>
  );
};

export default AddComment;
