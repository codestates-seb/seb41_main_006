import styled from 'styled-components';
import { FaUserCircle, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import RecommentList from './RecommentList';

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

  .comment-username {
    font-size: 14px;
    color: #000000;
    font-weight: bold;
  }

  .comment-createAt,
  .comment-like {
    font-size: 12px;
    padding-right: 10px;
  }

  .comment-createAt {
    color: #a79689;
  }

  .comment-like {
    color: #401809;
  }
  .comment-like-total {
    padding-left: 3px;
  }

  .comment-right {
    padding-right: 20px;

    button {
      /* background-color: transparent; */
      font-size: 22px;
      border: none;
    }
  }

  .comment-content {
    padding-bottom: 12px;
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
          <div>
            <span className="comment-username">{post.author}</span>
            <div>
              <span className="comment-createAt">2023.01.05 15:30</span>
              <span className="comment-like">
                <FaHeart />
                <span className="comment-like-total">{post.likes}</span>
              </span>
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
      <button className="recomment" onClick={handleRecommentsClick}>
        +답글 달기
      </button>
      {comments && <RecommentList comments={comments} />}
    </CommentBox>
  );
};

export default Comment;
