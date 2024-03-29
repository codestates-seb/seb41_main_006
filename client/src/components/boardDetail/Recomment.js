import styled from 'styled-components';
import ProfileImage from '../common/ProfileImage';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { openModal } from '../../store/modules/modalSlice';
import {
  commentLike,
  commentPatch,
  recommentDelete,
} from '../../api/board/comment';
import { convertCreatedAt } from '../../utils/dateConvert';
import { getLoginInfo } from '../../api/loginInfo';
import { useParams } from 'react-router-dom';

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
    display: flex;
    align-items: center;
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

    .like-icon {
      cursor: pointer;
    }

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
  const { boardId } = useParams();
  const loginMemberId = getLoginInfo().memberId;

  const dispatch = useDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [recommentContent, setRecommentContent] = useState('');

  const queryClient = useQueryClient();
  // 대댓글 삭제 mutate
  const { mutate: deleteRecommentMutation } = useMutation(recommentDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board', boardId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 대댓글 수정 mutate
  const { mutate: patchRecommentMutation } = useMutation(commentPatch, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board', boardId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 대댓글 좋아요 mutate
  const { mutate: likeRecommentMutation } = useMutation(commentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board', boardId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 대댓글 배열
  let recommentList = [];
  recommentList.push(recomment);

  // 회원 정보 모달창 띄우기
  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  // 대댓글 좋아요 & 좋아요 취소
  const handleLikeClick = (idx) => {
    likeRecommentMutation({
      commentId: idx,
      body: { memberId: loginMemberId },
    });
  };

  // 대댓글 수정
  const handleSubmitClick = async (recommentId) => {
    setIsEditOpen(!isEditOpen);

    patchRecommentMutation({
      commentId: recommentId,
      body: {
        commentsId: recommentId,
        content: recommentContent,
      },
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
    deleteRecommentMutation(recommentId);
  };

  return (
    <RecommentBox>
      <div className="recomment-left">
        <div className="recomment-user-info">
          <button
            className="user-profile"
            onClick={() => handleClickMember(recomment.member.memberId)}
          >
            {recomment?.member?.profileImage ? (
              <ProfileImage
                src={recomment?.member?.profileImage?.upFileUrl}
                name={recomment?.member?.nickName}
                size="40px"
              ></ProfileImage>
            ) : (
              <ProfileImage size="40px"></ProfileImage>
            )}
          </button>
          <div className="recomment-detail-info">
            <button
              className="recomment-username"
              onClick={() => handleClickMember(recomment.member.memberId)}
            >
              {recomment.member.nickName}
            </button>
            <div className="recomment-sub-info">
              <span className="recomment-createAt">
                {convertCreatedAt(recomment.createdAt)}
              </span>
              <span className="recomment-like">
                <FaHeart /> <span>{recomment.commentLike}</span>
              </span>
              <span className="recomment-like-total">
                {recomment.countLike}
              </span>
            </div>
          </div>
        </div>
        <div className="recomment-right">
          {recommentList[0].likedMembers.includes(Number(loginMemberId)) ? (
            <FaHeart
              className="like-icon"
              onClick={() => handleLikeClick(recomment.commentsId)}
            />
          ) : (
            <FaRegHeart
              className="like-icon"
              onClick={() => handleLikeClick(recomment.commentsId)}
            />
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
              <>
                {' '}
                {recomment?.member?.memberId === Number(loginMemberId) ? (
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditOpen(!isEditOpen)}
                  >
                    수정
                  </button>
                ) : (
                  ''
                )}
              </>
            )}
            {recomment?.member?.memberId === Number(loginMemberId) ? (
              <button
                className="del-btn"
                onClick={() => handelConfirmClick(recomment.commentsId)}
              >
                삭제
              </button>
            ) : (
              ''
            )}
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
    </RecommentBox>
  );
};

export default Recomment;
