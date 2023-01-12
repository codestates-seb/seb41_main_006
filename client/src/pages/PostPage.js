import styled from 'styled-components';
import Map from '../components/Map';
import Container from '../components/Container';
import { PostSubmitBtn, CancelButton } from '../components/Button';
// import { useParams } from 'react-router-dom';

const Containerr = styled(Container)`
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
  border-bottom: 1px solid black;

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

  .post-title {
    vertical-align: middle;
  }
  .title {
    /* align-items: center; */
    /* padding-left: 10px; */
    vertical-align: middle;
    padding: 13px 10px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  margin: 20px 10px 0 10px;

  .post-content {
    width: 720px;
    /* height: 300px; */
    height: 30rem;
    padding: 20px;

    textarea {
      height: 100%;
    }
  }

  .right-box {
    width: 100%;
    margin-left: 40px;
  }
`;

const BtnContainer = styled.div`
  margin-top: 48px;
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
    <Containerr>
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
          {/* <div className="post-content">
            안녕하세요~ 말티즈 둥이 키우는 집사입니다. 귀엽고 깜찍하고
            사랑스럽고 예쁜 아이입니다. 같이 산책하면서 재밌는 시간 보내요! 생각
            있으신 분은 댓글 달아주세요~!
          </div> */}
          <textarea
            className="post-content"
            placeholder="내용을 입력하세요"
          ></textarea>
          {/* <div className="dog-info">강아지 정보</div> */}
        </div>
        <div className="right-box">
          <Map />
        </div>
      </MainContainer>
      <BtnContainer>
        <PostSubmitBtn>작성</PostSubmitBtn>
        <CancelButton>취소</CancelButton>
      </BtnContainer>
    </Containerr>
  );
};

export default PostPage;
