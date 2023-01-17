import styled from 'styled-components';
import { FaUserCircle, FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import RecommentList from './RecommentList';
import { convertCreatedAt } from '../../utils/dateConvert';

const CommentBox = styled.div`
  height: 100%;

  .comment-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment-user-info {
    display: flex;
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

    .plus-icon {
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

const Comment = ({ post }) => {
  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    setLike(!like);
  };

  const [comments, setComments] = useState(false);

  const handleRecommentsClick = () => {
    setComments(!comments);
  };

  return (
    <CommentBox>
      <div className="comment-left">
        <div className="comment-user-info">
          <div className="user-profile">
            <FaUserCircle />
          </div>
          <div className="comment-detail-info">
            <span className="comment-username">{post.author}</span>
            <div className="comment-sub-info">
              <span className="comment-createAt">
                {convertCreatedAt(new Date())}
              </span>
              <span className="comment-like">
                <FaHeart />
              </span>
              <span className="comment-like-total">{post.likes}</span>
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
      <div className="comment-content">{post.content}</div>
      <button className="recomment-btn" onClick={handleRecommentsClick}>
        <FaPlus className="plus-icon" />
        <span>답글 달기</span>
      </button>
      {comments && <RecommentList comments={comments} />}
    </CommentBox>
  );
};

export default Comment;
