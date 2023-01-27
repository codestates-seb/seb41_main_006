import styled from 'styled-components';
import ProfileImage from '../common/ProfileImage';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import { commentPatch, commentDelete } from '../../api/board/comment';
import { convertCreatedAt } from '../../utils/dateConvert';

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

  .recomment-detail-info {
    padding-top: 5px;
  }

  .recomment-username {
    font-size: 14px;
    color: #000000;
    font-weight: bold;
    width: fit-content;
  }

  .recomment-sub-info,
  .recomment-like {
    font-size: 12px;
    padding-right: 3px;
  }

  .recomment-sub-info {
    color: #a79689;
  }

  .recomment-createAt {
    padding-right: 6px;
  }

  .recomment-like,
  .recomment-like-total {
    color: #ca7c62;
  }

  .recomment-right {
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

  .recomment-content {
    padding-bottom: 12px;
  }

  .recomment-detail-info {
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

const Recomment = ({ recomment }) => {
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [recommentContent, setRecommentContent] = useState('');

  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  const handleLikeClick = () => {
    setLike(!like);
  };

  // 대댓글 수정
  const handleSubmitClick = async (recommentId) => {
    setIsEditOpen(!isEditOpen);

    await commentPatch(recommentId, {
      commentsId: recommentId,
      content: recommentContent,
    });
  };

  // 대댓글 삭제 확인 모달 창 띄우기
  const handelConfirmClick = (recommentId) => {
    dispatch(
      openModal({
        type: 'delete',
        props: { recommentId, handleRecommentDelete },
      })
    );
  };

  // 대댓글 삭제
  const handleRecommentDelete = (recommentId) => {
    commentDelete(recommentId);
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
          <div className="recomment-detail-info">
            <button
              className="recomment-username"
              onClick={() => handleClickMember(recomment.memberId)}
            >
              {recomment.nickName}
            </button>
            <div className="recomment-sub-info">
              <span className="recomment-createAt">
                {convertCreatedAt(new Date())}
              </span>
              <span className="recomment-like">
                <FaHeart /> <span>{recomment.commentLike}</span>
              </span>
              <span className="recomment-like-total">{recomment.likes}</span>
            </div>
          </div>
        </div>
        <div className="recomment-right">
          {like ? (
            <FaHeart onClick={handleLikeClick} />
          ) : (
            <FaRegHeart onClick={handleLikeClick} />
          )}
          <div>
            {isEditOpen ? (
              <button
                className="edit-btn edit-finish"
                onClick={() => handleSubmitClick(recomment.commentsId)}
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
              onClick={() => handelConfirmClick(recomment.commentsId)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      {isEditOpen ? (
        <textarea
          className="recomment-content"
          defaultValue={recomment.content}
          onChange={(e) => setRecommentContent(e.target.value)}
        ></textarea>
      ) : (
        <div className="recomment-content">{recomment.content}</div>
      )}
      {/* <button className="recomment-btn" onClick={handleRecommentsClick}>
        {isRecommentsOpen ? (
          <FaMinus className="recomment-icon" />
        ) : (
          <FaPlus className="recomment-icon" />
        )}
        {recomment.length === 0 ? (
          <span>답글 달기</span>
        ) : (
          <span>답글 {recomment.length}개</span>
        )}
      </button>
      {isRecommentsOpen && <RecommentList recomments={recomment} />} */}
    </RecommentBox>
  );
};

export default Recomment;
