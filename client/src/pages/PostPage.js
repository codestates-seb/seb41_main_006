import styled from 'styled-components';
import MapContainer from '../components/matePost/MapContainer';
import Container from '../components/Container';
import { PostSubmitBtn, CancelButton } from '../components/Button';
// import { useParams } from 'react-router-dom';

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

  /* .post-title {
    display: flex;
    height: 40px;
    align-items: center;

    .title {
      margin-right: 30px;
      font-size: 26px;
      font-weight: bold;
      color: #401809;
      text-align: center;
    } 
  }*/

  /* .post-title {
    text-align: center;
    .title {
    }
  } */
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
    /* height: 300px; */
    height: 30rem;
    /* padding: 10px; */
  }

  .right-box {
    width: 100%;
    margin-left: 40px;
  }

  /* .selct-dog {
    background-color: red;
    height: 20%;
    margin-bottom: 40px;
  } */
`;

const BtnContainer = styled.div`
  margin-top: 80px;
  text-align: center;
  /* background-color: skyblue; */

  button {
    /* width: 100px; */
    /* height: 50px; */
    font-size: 20px;
    border-radius: 10px;
  }

  button + button {
    margin-left: 20px;
  }
`;

const PostPage = () => {
  // const { mateId } = useParams();

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
        <CancelButton>취소</CancelButton>
      </BtnContainer>
    </ContainerBox>
  );
};

export default PostPage;
