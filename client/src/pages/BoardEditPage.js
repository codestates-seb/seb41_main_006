import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { getBoardById } from '../api/board/board';
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
    height: 30rem;
  }

  .left-box {
    margin-right: 80px;
  }

  .right-box {
    margin-left: 40px;
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

  const [data, isLoading, error] = useFetch(`${FINDMATE_ENDPOINT}/${boardId}`);

  let board;
  if (data) {
    board = data.data;
    console.log(board);
  }

  // const [board, setBoard] = useState({});

  // useEffect(() => {
  //   getBoardById(Number(boardId)).then((data) => {
  //     setBoard(data);
  //   });
  // }, [boardId]);

  // 제목, 내용, 날짜, 장소 정보
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editDate, setEditDate] = useState();
  const [editPlace, setEditPlace] = useState([]);

  //강아지 정보
  const [petId, setPetid] = useState('');
  console.log(setPetid);

  const userKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   console.log(form);
  //   console.log(form.title_text.value);
  //   console.log(form.body_text.value);

  //   boardPatch(boardId, {
  //     title: form.title_text.value,
  //     content: form.content_text.value,
  //   });
  // };
  console.log(
    editTitle,
    editContent,
    editDate,
    editPlace[0],
    editPlace[1],
    editPlace[2],
    petId
  );

  const handleEdit = () => {
    boardPatch(boardId, {
      title: editTitle,
      content: editContent,
      appointTime: editDate,
      placeCode: editPlace[0],
      x: editPlace[1],
      y: editPlace[2],
      petId: petId,
    });

    //navigate(`/boards/${boardId}`);
    //window.location.reload();
  };

  return (
    <>
      {error && <div>글 조회 실패</div>}
      {isLoading ? (
        <PageLoading />
      ) : (
        <ContainerBox onKeyDown={userKeyDown} /*onSubmit={handleSubmit}*/>
          <HeaderContainer>
            <div className="post-title">
              <div>
                <textarea
                  className="title"
                  name="title_text"
                  defaultValue={board.title}
                  onChange={(e) => setEditTitle(e.target.value)}
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
              ></textarea>
              <div className="choose-pet">데리고 갈 친구</div>
              <GetDogInfo loginMemberId={loginMemberId} setPetid={setPetid} />
            </div>
            <MapContainer
              setEditDate={setEditDate}
              setEditPlace={setEditPlace}
            />
          </MainContainer>
          <BtnContainer>
            <PostSubmitBtn onClick={handleEdit}>수정</PostSubmitBtn>
            <CancelButton onClick={() => navigate(`/boards/${boardId}`)}>
              취소
            </CancelButton>
          </BtnContainer>
        </ContainerBox>
      )}
    </>
  );
};

export default BoardEditPage;
