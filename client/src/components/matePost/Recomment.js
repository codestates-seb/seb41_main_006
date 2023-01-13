import styled from 'styled-components';
import { FaUserCircle, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

const RecommentBox = styled.div`
  height: 100%;

  .recomment-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .recomment-user-info {
    display: flex;
    /* align-items: center; */

    .user-profile {
      font-size: 40px;
      margin-right: 10px;
    }
  }

  .recomment-username {
    font-size: 14px;
    color: #000000;
    font-weight: bold;
  }

  .recomment-createAt,
  .recomment-like {
    font-size: 12px;
    padding-right: 10px;
  }

  .recomment-createAt {
    color: #a79689;
  }

  .recomment-like {
    color: #ca7c62;
  }
  .recomment-like-total {
    padding-left: 3px;
  }

  .recomment-right {
    padding-right: 20px;
    color: #ca7c62;

    button {
      /* background-color: transparent; */
      font-size: 22px;
      border: none;
    }
  }

  .recomment-content {
    padding-bottom: 12px;
  }
`;

const Recomment = ({ post }) => {
  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    setLike(!like);
  };

  return (
    <RecommentBox>
      <div className="recomment-left">
        <div className="recomment-user-info">
          <div className="user-profile">
            <FaUserCircle />
          </div>
          <div>
            <span className="recomment-username">{post.author}</span>
            <div>
              <span className="recomment-createAt">2023.01.05 15:30</span>
              <span className="recomment-like">
                <FaHeart />
                <span className="recomment-like-total">{post.likes}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="recomment-right">
          {like ? (
            <FaHeart onClick={handleLikeClick} />
          ) : (
            <FaRegHeart onClick={handleLikeClick} />
          )}
        </div>
      </div>
      <div className="recomment-content">{post.content}</div>
    </RecommentBox>
  );
};

export default Recomment;
