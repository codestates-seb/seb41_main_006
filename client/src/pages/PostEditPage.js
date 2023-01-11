import styled from 'styled-components';
import { CheckButton, CancelButton } from '../components/Button';

const Container = styled.div`
  textarea {
    height: 42px;
    width: 100%;
    border: none;
    resize: none;
    background-color: transparent;

    :focus {
      outline: none;
    }

    ::placeholder {
      color: #b7a69e;
    }
  }
`;

const PostHeader = styled.div`
  .post-title {
    textarea {
      font-size: 24px;
      font-weight: bold;
      border-bottom: 1px solid #a79689;
    }
  }

  .post-content {
    textarea {
      font-size: 14px;
      padding: 20px;
    }
  }
`;

const PostContent = styled.div`
  height: 600px;
  display: flex;
  justify-content: space-between;
  //align-items: center;

  .post-content {
    width: 400px;
  }

  .meet-location {
    width: 400px;
    height: 500px;
    display: flex;
    /* justify-content: center; */
    flex-wrap: wrap;
    padding: 10px;
    color: #401809;
    font-weight: bold;
    background-color: #ffffff;
    border-radius: 10px;

    input {
      border-radius: 10px;
      height: 24px;
      border: 1px solid #b7a69e;
    }

    .meet-date,
    .meet-time {
      width: 50%;
    }

    .meet-place,
    .meet-place-map {
      width: 100%;
    }

    .meet-place-map {
      height: 200px;
      /* background-color: black; */
    }
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  /* background-color: skyblue; */

  button {
    width: 100px;
    height: 50px;
    font-size: 30px;
    border-radius: 10px;
  }

  button + button {
    margin-left: 20px;
  }
`;

const PostPage = () => {
  return (
    <Container>
      <PostHeader>
        <div className="post-title">
          <textarea placeholder="제목을 입력하세요"></textarea>
        </div>
      </PostHeader>
      <PostContent>
        <div className="post-content">
          <textarea placeholder="내용을 입력하세요"></textarea>
        </div>
        <div className="meet-location">
          <div className="meet-date">
            <label className="date" htmlFor="dateInput">
              {' '}
              날짜 <br />
              <input type="date" id="dateInput"></input>
            </label>
          </div>
          <div className="meet-time">
            <label className="time" htmlFor="timeInput">
              시간 <br />
              <input type="time" id="timeInput"></input>
            </label>
          </div>
          <div className="meet-place">
            <label className="place" htmlFor="placeInput">
              만나는 장소 <br />
              <input
                type="place"
                id="placeInput"
                placeholder="원하는 장소를 검색해주세요"
              ></input>
            </label>
          </div>
          <div className="meet-place-map">map</div>
        </div>
      </PostContent>
      <ButtonContainer>
        <CheckButton>등록</CheckButton>
        <CancelButton>취소</CancelButton>
      </ButtonContainer>
    </Container>
  );
};

export default PostPage;
