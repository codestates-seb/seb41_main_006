import styled from 'styled-components';
import ProfileImage from '../common/ProfileImage';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';

const RecommentBox = styled.div`
  height: 100%;

  .recomment-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .recomment-user-info {
    display: flex;
    margin-bottom: 1rem;
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

const Recomment = ({ recomment }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  const handleLikeClick = () => {
    setLike(!like);
  };

  return (
    <RecommentBox>
      <div className="recomment-left">
        <div className="recomment-user-info">
          <button
            className="user-profile"
            onClick={() => handleClickMember(recomment.memberId)}
          >
            <ProfileImage
              src={recomment.profileImage}
              name={recomment.nickName}
              size="40px"
            ></ProfileImage>
          </button>
          <div>
            <button
              className="recomment-username"
              onClick={() => handleClickMember(recomment.memberId)}
            >
              {recomment.nickName}
            </button>
            <div>
              <span className="recomment-createAt">2023.01.05 15:30</span>
              <span className="recomment-like">
                <FaHeart />
                <span className="recomment-like-total">{recomment.likes}</span>
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
      <div className="recomment-content">{recomment.content}</div>
    </RecommentBox>
  );
};

export default Recomment;
