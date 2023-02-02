import { useParams, useNavigate } from 'react-router-dom';
import { openModal } from '../store/modules/modalSlice';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Container from '../components/Container';
import { BoardOpenBox, BoardCloseBox } from '../components/BoardStatus';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ProfileImage from '../components/common/ProfileImage';
import PetInfoCard from '../components/myPage/PetInfoCard';
import BoardMeetInfo from '../components/boardDetail/BoardMeetInfo';
import CommentContainer from '../components/boardDetail/CommentContainer';
// import { RowCenterBox } from '../components/FlexBoxs';
import { boardDelete, boardLike, boardGetById } from '../api/board/findMate';
import { getLoginInfo } from '../api/loginInfo';
import PageLoading from '../components/PageLoading';
import { convertCreatedAt } from '../utils/dateConvert';

const ContainerBox = styled(Container)`
  padding: 20px;

  .comment {
    background-color: yellow;
    height: 100px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #a79689;

  .post-title {
    display: flex;
    height: 40px;
    align-items: center;

    .title {
      margin-right: 10px;
      font-size: 26px;
      font-weight: bold;
      color: #401809;
      text-align: center;
    }
  }

  .post-info {
    display: flex;
    /* margin: 0 10px; */
    align-items: center;
    height: 24px;
    margin-bottom: 8px;

    .post-createAt {
      margin-right: 16px;
      font-size: 14px;
      color: #a79689;
    }

    .post-like {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #ca7c62;

      span {
        padding-left: 4px;
      }
    }

    .post-btn {
      margin-left: auto;
    }

    .post-edit,
    .post-del,
    .post-like-btn {
      margin-left: 10px;
      color: #401809;
      border: none;
      background-color: transparent;
      font-size: 16px;
    }

    .post-like-btn {
      padding-right: 16px;
      color: #ca7c62;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  margin: 20px 10px 0 10px;
  .left-box {
    display: flex;
    flex-direction: column;
  }
  .post-content {
    /* width: 720px; */
    width: 100%;
    height: 15rem;
  }

  .comment-cnt {
    color: #401809;
    margin-bottom: 6px;
  }

  .right-box {
    width: 100%;
    margin-left: 30px;
    padding: 2.5rem 1.5rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 62rem;

    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

    > .pet-box {
      width: 80%;
    }
    > .choosed-pet {
      margin-bottom: 0.25rem;
      color: var(--main-font-color);
      font-weight: 600;
    }

    > .member-info {
      display: flex;
      align-items: center;
      > .member-info--link {
        display: flex;
        align-items: center;
        margin: 0 0.25rem;
        > button {
          color: var(--main-color);
          font-size: 1rem;
          font-weight: 600;
        }
      }
    }
  }

  .user-info-btn {
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    color: var(--main-color);
  }
  .post-meet-info {
    /* position: sticky;
    top: calc(var(--header-height) + 1.25rem); */
    width: 100%;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--main-font-color);
  }
`;

const BoardDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { boardId } = useParams();
  const loginMemberId = getLoginInfo().memberId;

  const {
    data: board,
    isLoading,
    isError,
  } = useQuery(['board', boardId], async () => await boardGetById(boardId), {
    placeholderData: {
      comments: [],
      likedMembers: [],
      member: {},
      pet: {},
    },
  });

  // 회원 정보 모달 창 띄우기
  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  // 글 삭제 확인 모달 창 띄우기
  const handelConfirmClick = () => {
    dispatch(
      openModal({ type: 'delete', props: { boardId, handleBoardDelete } })
    );
  };

  // 글 삭제
  const handleBoardDelete = (boardId) => {
    boardDelete(boardId);
  };

  // 좋아요 & 좋아요 취소
  const handleLikeClick = () => {
    boardLike(boardId, { memberId: loginMemberId });
  };

  return (
    <>
      {isError && <div>글 조회 실패</div>}
      {isLoading ? (
        <PageLoading />
      ) : (
        <ContainerBox>
          <HeaderContainer>
            <div className="post-title">
              <div className="title">{board.title}</div>
              {board.boardStatus === 'BOARD_OPEN' ? (
                <BoardOpenBox>모집중</BoardOpenBox>
              ) : (
                <BoardCloseBox>모집완료</BoardCloseBox>
              )}
            </div>
            <div className="post-info">
              <div className="post-createAt">
                {convertCreatedAt(board.createdAt)}
              </div>
              <div className="post-like">
                <FaHeart onClick={handleLikeClick} />
                <span>{board.countLike}</span>
              </div>
              <div className="post-btn">
                {board?.member?.memberId === Number(loginMemberId) ? (
                  <>
                    {board.boardStatus === 'BOARD_OPEN' ? (
                      <button
                        className="post-edit"
                        onClick={() => navigate(`/mate/boards/${boardId}/edit`)}
                      >
                        수정
                      </button>
                    ) : (
                      ''
                    )}
                    <button className="post-del" onClick={handelConfirmClick}>
                      삭제
                    </button>
                  </>
                ) : (
                  ''
                )}
                {board?.likedMembers?.includes(Number(loginMemberId)) ? (
                  <button className="post-like-btn">
                    <FaHeart onClick={handleLikeClick} />
                  </button>
                ) : (
                  <button className="post-like-btn">
                    <FaRegHeart onClick={handleLikeClick} />
                  </button>
                )}
              </div>
            </div>
          </HeaderContainer>
          <MainContainer>
            <div className="left-box">
              <div className="post-content">{board?.content}</div>
              <CommentContainer comments={board?.comments} />
            </div>
            <div className="right-box">
              <div className="member-info">
                <span>산책 메이트 </span>
                <div className="member-info--link">
                  <button
                    onClick={() => handleClickMember(board?.member?.memberId)}
                  >
                    {board?.member?.nickName}
                  </button>
                  {board?.member?.profileImage ? (
                    <ProfileImage
                      src={board.member.profileImage.upFileUrl}
                    ></ProfileImage>
                  ) : (
                    <ProfileImage></ProfileImage>
                  )}
                </div>
                <span> 님과</span>
              </div>
              <div className="choosed-pet">같이 가는 친구</div>
              <div className="pet-box">
                <PetInfoCard pet={board.pet}></PetInfoCard>
              </div>
              <div className="post-meet-info">
                <BoardMeetInfo
                  meetInfo={{
                    appointTime: board.appointTime,
                    meetingPlace: board.meetingPlace,
                    x: board.x,
                    y: board.y,
                  }}
                />
              </div>
            </div>
          </MainContainer>
        </ContainerBox>
      )}
    </>
  );
};

export default BoardDetailPage;
