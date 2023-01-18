import styled from 'styled-components';
import MapContainer from '../components/matePost/MapContainer';
import Container from '../components/Container';
import { PostSubmitBtn, CancelButton } from '../components/Button';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

  .right-box {
    width: 100%;
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

const BoardPage = () => {
  // const { mateId } = useParams();
  const navigate = useNavigate();

  return (
    <ContainerBox>
      <HeaderContainer>
        <div className="post-title">
          <div>
            <textarea
              className="title"
              placeholder="제목을 입력하세요"
            ></textarea>
          </div>
        </div>
      </HeaderContainer>
      <MainContainer>
        <div className="left-box">
          <textarea
            className="post-content"
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <div className="right-box">
          <MapContainer />
        </div>
      </MainContainer>
      <BtnContainer>
        <PostSubmitBtn>등록</PostSubmitBtn>
        <CancelButton onClick={() => navigate('/mate/boards')}>
          취소
        </CancelButton>
      </BtnContainer>
    </ContainerBox>
  );
};

export default BoardPage;
