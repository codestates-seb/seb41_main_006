import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexRowCenter } from '../../style/styleVariable';
import ProfileImage from '../common/ProfileImage';
import Title from '../common/Title';
import { openModal } from '../../store/modules/modalSlice';
import { useDispatch } from 'react-redux';
import { IoLocationSharp } from 'react-icons/io5';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const PostCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  .post-card--top {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    margin-bottom: 1rem;
    h4 {
      margin-bottom: 0.5rem;
    }

    div {
      ${flexRowCenter}
      gap: 0.3rem;
      font-weight: 500;
      color: var(--sec-color);
    }
  }

  .post-card--bottom {
    ${flexRowCenter}
    color: var(--main-font-color);
    font-weight: 500;
    align-items: center;
    justify-content: space-between;

    div,
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      line-height: 1;
      svg {
        color: var(--main-color);
      }
    }
  }
`;

const MateBoardCard = ({ post }) => {
  const dispatch = useDispatch();

  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  return (
    <PostCard>
      <Link to={`/mate/boards/${post.id}`}>
        <div className="post-card--top">
          <Title as="h4" size="small">
            {post.title}
          </Title>
          <div>
            <IoLocationSharp />
            <span>{post.meetingPlace}</span>
          </div>
          <div>
            <AiTwotoneCalendar />
            <span>{post.appointDate}</span>
          </div>
          <div>
            <FiClock />
            <span>{post.appointTime}</span>
          </div>
        </div>
      </Link>
      <div className="post-card--bottom">
        <button onClick={() => handleClickMember(post.authorId)}>
          <ProfileImage
            src={post.authorImg}
            name={post.authorName}
            size="2rem"
          />
          <span>{post.authorName}</span>
        </button>
        <div>
          <FaHeart />
          {post.countLike}
        </div>
      </div>
    </PostCard>
  );
};

export default MateBoardCard;
