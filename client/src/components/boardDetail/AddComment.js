import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { commentCreate } from '../../api/board/comment';
import { CommentBtn } from '../Button';

const CommentContainer = styled.form`
  width: 100%;
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

    :focus {
      outline: none;
    }
  }

  button {
    position: absolute;
    right: 17px;
    bottom: 24px;
  }
`;

const AddComment = () => {
  const { boardId } = useParams();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.comment_text.value);

    await commentCreate(boardId, {
      content: form.comment_text.value,
    });

    form.comment_text.value = '';
  };

  return (
    <CommentContainer onSubmit={handleCommentSubmit}>
      <textarea
        placeholder="댓글을 작성하세요"
        name="comment_text"
        required
      ></textarea>
      <CommentBtn>작성</CommentBtn>
    </CommentContainer>
  );
};

export default AddComment;
