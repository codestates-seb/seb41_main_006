import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import { PostSubmitBtn, CancelButton } from '../components/Button';
import MapContainer from '../components/boardDetail/MapContainer';
import { boardPatch, FINDMATE_ENDPOINT } from '../api/board/findMate';
import useFetch from '../hooks/useFetch';
import PageLoading from '../components/PageLoading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GetDogInfo from '../components/GetDogInfo';
import { getLoginInfo } from '../api/loginInfo';

const ContainerBox = styled(Container)`
  padding-top: 44px;
  padding-bottom: 44px;

  textarea {
    width: 100%;
    height: 42px;
    resize: none;
    border: none;
    background-color: transparent;

    :focus {
      outline: none;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #a79689;
  padding-bottom: 6px;

  textarea {
    font-size: 24px;
    overflow: hidden;
    vertical-align: middle;
    padding: 13px 0;
    font-weight: bold;
    color: #401809;

    ::placeholder {
      color: #b7a69e;
      font-size: 24px;
      font-weight: bold;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  margin: 20px 10px 0 10px;

  textarea {
    height: 100%;
    font-size: 18px;

    ::placeholder {
      color: #b7a69e;
      font-size: 18px;
    }
  }

  .choose-pet {
    font-size: 1.2rem;
    border-bottom: 1px solid #a79689;
  }

  .post-content {
    width: 720px;
    height: 15rem;
  }

  .left-box {
    margin-right: 80px;
  }

  .right-box {
    margin-left: 40px;
  }

  .block-box {
    display: none;
  }
`;

const BtnContainer = styled.div`
  margin-top: 80px;
  text-align: center;

  button {
    font-size: 20px;
    border-radius: 10px;
  }

  button + button {
    margin-left: 20px;
  }
`;

const BoardEditPage = () => {
  const { boardId } = useParams();
  const loginMemberId = getLoginInfo().memberId;
  const navigate = useNavigate();

  // 제목, 내용, 날짜, 장소 정보
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editDate, setEditDate] = useState();
  const [editPlace, setEditPlace] = useState([]);

  //강아지 정보
  const [petId, setPetid] = useState('');

  const [data, isLoading, error] = useFetch(`${FINDMATE_ENDPOINT}/${boardId}`);

  let board;
  if (data) {
    board = data.data;
  }

  const userKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleEdit = () => {
    if (editTitle === undefined) {
      setEditTitle(board.title);
    } else if (editContent === undefined) {
      setEditContent(board.content);
    } else if (editDate === undefined) {
      setEditDate(board.appointTime);
    } else if (editPlace === undefined) {
      setEditPlace(board.placeCode, board.x, board.y);
    }

    boardPatch(boardId, {
      title: editTitle,
      content: editContent,
      appointTime: editDate,
      placeCode: editPlace[0],
      x: editPlace[1],
      y: editPlace[2],
      petId: petId,
    });
  };

  // 글 수정
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let petNum;

    if (editPlace[0] === undefined) {
      editPlace[0] = form.placeCode_text.value;
      setEditPlace([...editPlace]);
    }
    if (editPlace[1] === undefined) {
      editPlace[1] = form.x_text.value;
      setEditPlace([...editPlace]);
    }
    if (editPlace[2] === undefined) {
      editPlace[2] = form.y_text.value;
      setEditPlace([...editPlace]);
    }

    if (form.petId_text.value !== petId) {
      petNum = petId;
    } else {
      petNum = form.pedId_text.value;
    }

    boardPatch(boardId, {
      title: form.title_text.value,
      content: form.body_text.value,
      appointTime: editDate,
      placeCode: editPlace[0],
      x: editPlace[1],
      y: editPlace[2],
      pedId: petNum,
    });

    navigate(`/boards/${boardId}`);
  };

  return (
    <>
      {error && <div>글 조회 실패</div>}
      {isLoading ? (
        <PageLoading />
      ) : (
        <ContainerBox onKeyDown={userKeyDown}>
          <form onSubmit={handleSubmit}>
            <HeaderContainer>
              <div className="post-title">
                <div>
                  <textarea
                    className="title"
                    name="title_text"
                    defaultValue={board.title}
                    onChange={(e) => setEditTitle(e.target.value)}
                    spellCheck="false"
                  ></textarea>
                </div>
              </div>
            </HeaderContainer>
            <MainContainer>
              <div className="left-box">
                <textarea
                  className="post-content"
                  name="body_text"
                  defaultValue={board.content}
                  onChange={(e) => setEditContent(e.target.value)}
                  spellCheck="false"
                ></textarea>
                <div className="choose-pet">데리고 갈 친구</div>
                <GetDogInfo loginMemberId={loginMemberId} setPetid={setPetid} />
                <div className="block-box">
                  <input
                    name="placeCode_text"
                    defaultValue={board.placeCode}
                  ></input>
                  <input name="x_text" defaultValue={board.x}></input>
                  <input name="y_text" defaultValue={board.y}></input>
                  <input
                    name="petId_text"
                    defaultValue={board.pet.petId}
                  ></input>
                </div>
              </div>
              <MapContainer
                setEditDate={setEditDate}
                editPlace={editPlace}
                setEditPlace={setEditPlace}
              />
            </MainContainer>
            <BtnContainer>
              <PostSubmitBtn onClick={handleEdit}>수정</PostSubmitBtn>
              <CancelButton onClick={() => navigate(`/boards/${boardId}`)}>
                취소
              </CancelButton>
            </BtnContainer>
          </form>
        </ContainerBox>
      )}
    </>
  );
};

export default BoardEditPage;
