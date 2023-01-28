import { useParams, useNavigate } from 'react-router-dom';
// import { getBoardById } from '../api/board/board';
import { openModal } from '../store/modules/modalSlice';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';
import { BoardOpenBox, BoardCloseBox } from '../components/BoardStatus';
// import { OpenBtn, CloseBtn } from '../components/Button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { convertCreatedAt } from '../utils/dateConvert';
import MemberInfoCard from '../components/myPage/MemberInfoCard';
import BoardMeetInfo from '../components/boardDetail/BoardMeetInfo';
import CommentContainer from '../components/boardDetail/CommentContainer';
import {
  FINDMATE_ENDPOINT,
  boardDelete,
  boardLike,
} from '../api/board/findMate';
import useFetch from '../hooks/useFetch';
import { getLoginInfo } from '../api/loginInfo';
import PageLoading from '../components/PageLoading';
import { convertCreatedAt } from '../utils/dateConvert';
import ChoosedPetInfo from '../components/boardDetail/ChoosedPetInfo';

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
      font-size: 14px;
      color: #ca7c62;

      span {
        padding-left: 3px;
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
    .choosed-pet {
      border-bottom: 1px solid #a79689;
    }
  }
  .post-content {
    /* width: 720px; */
    width: 100%;
    height: 300px;
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

    height: 51rem;

    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
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

  const [data, isLoading, error] = useFetch(`${FINDMATE_ENDPOINT}/${boardId}`);

  let board, boardMemberId;
  if (data) {
    board = data.data;
    boardMemberId = data.data.member.memberId;
  }

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
      {error && <div>글 조회 실패</div>}
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
                {boardMemberId === Number(loginMemberId) ? (
                  <>
                    <button
                      className="post-edit"
                      onClick={() => navigate(`/mate/boards/${boardId}/edit`)}
                    >
                      수정
                    </button>
                    <button className="post-del" onClick={handelConfirmClick}>
                      삭제
                    </button>
                  </>
                ) : (
                  ''
                )}
                {board.likedMembers.includes(Number(loginMemberId)) ? (
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
              <div className="post-content">{board.content}</div>
              <h3 className="choosed-pet">같이 가는 친구</h3>
              <ChoosedPetInfo pets={board.pet} />
              <CommentContainer comments={board.comments} />
            </div>
            <div className="right-box">
              <MemberInfoCard memberInfo={board.member} />
              <button
                className="user-info-btn"
                onClick={() => handleClickMember(board.member.memberId)}
              >
                {'> 상세 정보'}
              </button>
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
