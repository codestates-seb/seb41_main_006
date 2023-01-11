import styled from 'styled-components';
import { StateButton } from '../components/Button';
import { FaHeart } from 'react-icons/fa';
import Map from '../components/Map';
import Container from '../components/Container';

const Containerr = styled(Container)`
  .comment {
    background-color: yellow;
    height: 100px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;

  .post-title {
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
      color: #401809;
    }

    .post-edit {
      margin-left: auto;
      margin-right: 10px;
      color: #401809;
    }

    .post-del {
      color: #401809;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  margin: 20px 10px 0 10px;

  .post-content {
    width: 720px;
    height: 300px;
  }

  .dog-info {
    background-color: blue;
    width: 720px;
    height: 130px;
    margin: 20px 0;
  }
`;

const PostDetailPage = () => {
  return (
    <Containerr>
      <HeaderContainer>
        <div className="post-title">
          <div className="title">같이 산책해요~!!</div>
          <StateButton>모집중</StateButton>
        </div>
        <div className="post-info">
          <div className="post-createAt">2023.01.05 15:28</div>
          <div className="post-like">
            <span>
              <FaHeart />
            </span>
            <span>3</span>
          </div>
          <div className="post-edit">수정</div>
          <div className="post-del">삭제</div>
        </div>
      </HeaderContainer>
      <MainContainer>
        <div className="left-box">
          <div className="post-content">
            안녕하세요~ 말티즈 둥이 키우는 집사입니다. 귀엽고 깜찍하고
            사랑스럽고 예쁜 아이입니다. 같이 산책하면서 재밌는 시간 보내요! 생각
            있으신 분은 댓글 달아주세요~!
          </div>
          {/* <div className="dog-info">강아지 정보</div> */}
          <div className="comment">댓글</div>
        </div>
        <div className="right-box">
          <div>강아지정보</div>
          <Map />
        </div>
      </MainContainer>
    </Containerr>
  );
};

export default PostDetailPage;
