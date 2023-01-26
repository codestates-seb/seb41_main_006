import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import ProfileImage from '../common/ProfileImage';
import RecommentList from './RecommentList';
import { convertCreatedAt } from '../../utils/dateConvert';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import { commentPatch, commentDelete } from '../../api/board/comment';

const CommentBox = styled.div`
  height: 100%;

  .comment-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment-user-info {
    display: flex;
    margin-bottom: 1rem;
    /* align-items: center; */

    .user-profile {
      font-size: 40px;
      margin-right: 10px;
    }
  }

  .comment-detail-info {
    padding-top: 5px;
  }

  .comment-username {
    font-size: 14px;
    color: #000000;
    font-weight: bold;
    width: fit-content;
  }

  .comment-sub-info,
  .comment-like {
    font-size: 12px;
    padding-right: 3px;
  }

  .comment-sub-info {
    color: #a79689;
  }

  .comment-createAt {
    padding-right: 6px;
  }

  .comment-like,
  .comment-like-total {
    color: #ca7c62;
  }

  .comment-right {
    padding-right: 20px;
    color: #ca7c62;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;

    button {
      margin-left: 10px;
      font-size: 14px;
      border: none;
    }
  }

  .comment-content {
    padding-bottom: 12px;
  }

  .recomment-btn {
    border: none;
    background-color: transparent;
    color: #ca7c62;

    .recomment-icon {
      font-size: 12px;
    }

    span {
      font-size: 15px;
      font-weight: bold;
      padding-left: 4px;
    }
  }

  .comment-detail-info {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  textarea {
    resize: none;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #b7a69e;
    font-size: 16px;

    :focus {
      outline: none;
    }
  }

  .edit-finish {
    color: #ca7c62;
    font-weight: 600;
  }
`;

const Comment = ({ comment, recomments }) => {
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [isRecommentsOpen, setIsRecommentsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  const handleLikeClick = () => {
    setLike(!like);
  };

  const handleRecommentsClick = () => {
    setIsRecommentsOpen(!isRecommentsOpen);
  };

  // 댓글 수정
  const handleSubmitClick = async (idx) => {
    setIsEditOpen(!isEditOpen);

    await commentPatch(idx, {
      commentsId: idx,
      content: commentContent,
    });
  };

  // 댓글 삭제 확인 모달 창 띄우기
  const handelConfirmClick = (idx) => {
    console.log('댓글 삭제 확인 버튼');
    dispatch(
      openModal({ type: 'delete', props: { idx, handleCommentDelete } })
    );
  };

  // const handelDelClick = () => {
  //   //dispatch(openModal({ type: 'delete' }));
  //   console.log('댓글 삭제');
  // };

  // const handleCancelClick = () => {
  //   console.log('댓글 삭제 취소');
  //   dispatch(closeModal({ type: 'delete' }));
  // };

  // 댓글 삭제
  const handleCommentDelete = (idx) => {
    commentDelete(idx);
    console.log('댓글 삭제 성공');
  };

  return (
    <CommentBox>
      <div className="comment-left">
        <div className="comment-user-info">
          <button
            className="user-profile"
            onClick={() => handleClickMember(comment.memberId)}
          >
            <ProfileImage
              src={comment.profileImage}
              name={comment.nickName}
              size="40px"
            ></ProfileImage>
          </button>
          <div className="comment-detail-info">
            <button
              className="comment-username"
              onClick={() => handleClickMember(comment.memberId)}
            >
              {comment.nickName}
            </button>
            <div className="comment-sub-info">
              <span className="comment-createAt">
                {convertCreatedAt(new Date())}
              </span>
              <span className="comment-like">
                <FaHeart /> <span>{comment.commentLike}</span>
              </span>
              <span className="comment-like-total">{comment.likes}</span>
            </div>
          </div>
        </div>
        <div className="comment-right">
          {like ? (
            <FaHeart onClick={handleLikeClick} />
          ) : (
            <FaRegHeart onClick={handleLikeClick} />
          )}
          <div>
            {isEditOpen ? (
              <button
                className="edit-btn edit-finish"
                onClick={() => handleSubmitClick(comment.commentsId)}
              >
                수정완료
              </button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setIsEditOpen(!isEditOpen)}
              >
                수정
              </button>
            )}
            <button
              className="del-btn"
              onClick={() => handelConfirmClick(comment.commentsId)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      {isEditOpen ? (
        <textarea
          className="comment-content"
          defaultValue={comment.content}
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}
      <button className="recomment-btn" onClick={handleRecommentsClick}>
        {isRecommentsOpen ? (
          <FaMinus className="recomment-icon" />
        ) : (
          <FaPlus className="recomment-icon" />
        )}
        {recomments.length === 0 ? (
          <span>답글 달기</span>
        ) : (
          <span>답글 {recomments.length}개</span>
        )}
      </button>
      {isRecommentsOpen && <RecommentList recomments={recomments} />}
    </CommentBox>
  );
};

export default Comment;