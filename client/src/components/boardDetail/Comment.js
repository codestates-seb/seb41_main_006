import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import ProfileImage from '../common/ProfileImage';
import RecommentList from './RecommentList';
import { convertCreatedAt } from '../../utils/dateConvert';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';

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

    button {
      font-size: 22px;
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
`;

const Comment = ({ comment, recomments }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [isRecommentsOpen, setIsRecommentsOpen] = useState(false);

  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  const handleLikeClick = () => {
    setLike(!like);
  };

  const handleRecommentsClick = () => {
    setIsRecommentsOpen(!isRecommentsOpen);
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
              src={
                comment.profileImage ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
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
                <FaHeart />
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
        </div>
      </div>
      <div className="comment-content">{comment.content}</div>
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
