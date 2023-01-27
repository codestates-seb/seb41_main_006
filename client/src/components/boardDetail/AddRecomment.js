import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { recommentCreate } from '../../api/board/comment';
import { CommentBtn } from '../Button';
import { getLoginInfo } from '../../api/loginInfo';

const CommentContainer = styled.form`
  width: 100%;
  position: relative;
  margin-top: 10px;

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

const AddRecomment = ({ parentId }) => {
  const { boardId } = useParams();

  const loginMemberId = getLoginInfo().memberId;

  const handleRecommentSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    await recommentCreate(parentId, {
      memberId: loginMemberId,
      boardId: boardId,
      content: form.recomment_text.value,
    });

    form.recomment_text.value = '';
  };

  return (
    <CommentContainer onSubmit={handleRecommentSubmit}>
      <textarea
        placeholder="답글을 작성하세요"
        name="recomment_text"
        required
      ></textarea>
      <CommentBtn>작성</CommentBtn>
    </CommentContainer>
  );
};

export default AddRecomment;
