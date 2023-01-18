import styled from 'styled-components';
import Container from '../components/Container';
import { PostSubmitBtn, CancelButton } from '../components/Button';
import { useParams, useNavigate } from 'react-router-dom';
import dummyBoards from '../api/board/dummyBoards';
import MapContainer from '../components/matePost/MapContainer';

const ContainerBox = styled(Container)`
  padding-top: 44px;

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
  const navigate = useNavigate();

  return (
    <ContainerBox>
      <HeaderContainer>
        <div className="post-title">
          <div>
            <textarea className="title">{dummyBoards.data[0].title}</textarea>
          </div>
        </div>
      </HeaderContainer>
      <MainContainer>
        <div className="left-box">
          <textarea className="post-content">
            {dummyBoards.data[0].content}
          </textarea>
        </div>
        <MapContainer />
      </MainContainer>
      <BtnContainer>
        <PostSubmitBtn>수정</PostSubmitBtn>
        <CancelButton onClick={() => navigate(`/mate/boards/${boardId}`)}>
          취소
        </CancelButton>
      </BtnContainer>
    </ContainerBox>
  );
};

export default BoardEditPage;
