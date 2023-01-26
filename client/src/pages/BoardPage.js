import styled from 'styled-components';
import MapContainer from '../components/boardDetail/MapContainer';
import Container from '../components/Container';
import { PostSubmitBtn, CancelButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { boardCreate } from '../api/board/findMate';
import ChoosePetInfo from '../components/boardDetail/ChoosePetInfo';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const dummyPet = [
  {
    petId: 1,
    profileImage: 'url',
    name: '둥이',
    age: '2',
    gender: 'M',
    petSize: 'DOG_S',
    neutered: true,
    aboutDog: '테스트용',
    breed: '말티즈',
    createdAt: '2023-01-19T14:20:02.308246',
    modifiedAt: '2023-01-19T14:20:02.308246',
  },
  {
    petId: 2,
    profileImage: 'url',
    name: '둥일',
    age: '2',
    gender: 'M',
    petSize: 'DOG_S',
    neutered: true,
    aboutDog: '테스트용',
    breed: '말티즈',
    createdAt: '2023-01-19T14:20:02.308246',
    modifiedAt: '2023-01-19T14:20:02.308246',
  },
];
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
  .choose-pet {
    font-size: 1.2rem;
    border-bottom: 1px solid #a79689;
  }
  .slider {
    width: 720px;
    .slick-prev::before,
    .slick-next::before {
      color: var(--main-font-color);
    }
  }
  .slick-slide {
    padding: 0 5px;
  }

  .post-content {
    width: 720px;
    height: 15rem;
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

const settings = {
  className: 'slider variable-width',
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
};

const BoardPage = () => {
  const navigate = useNavigate();
  //강아지 정보
  const [petId, setPetid] = useState('');

  // 제목, 내용 정보
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 날짜, 위치 정보
  const [dateInfo, setDateInfo] = useState();
  const [locInfo, setLocInfo] = useState([]);

  // 글 등록하기
  const handleSubmit = () => {
    boardCreate({
      title: title,
      content: content,
      appointTime: dateInfo,
      placeCode: locInfo[0],
      x: locInfo[1],
      y: locInfo[2],
      petId: petId,
    });
  };
  console.log(dateInfo, locInfo);
  console.log(petId);

  return (
    <ContainerBox>
      <HeaderContainer>
        <div className="post-title">
          <div>
            <textarea
              className="title"
              placeholder="제목을 입력하세요"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
        </div>
      </HeaderContainer>
      <MainContainer>
        <div className="left-box">
          <textarea
            className="post-content"
            placeholder="내용을 입력하세요"
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="choose-pet">데리고 갈 친구</div>
          <ul>
            <Slider {...settings}>
              {dummyPet.map((el) => {
                return (
                  <ChoosePetInfo key={el.index} pets={el} setPetid={setPetid} />
                );
              })}
            </Slider>
          </ul>
        </div>
        <div className="right-box">
          <MapContainer
            locInfo={locInfo}
            setDateInfo={setDateInfo}
            setLocInfo={setLocInfo}
          />
        </div>
      </MainContainer>
      <BtnContainer>
        <PostSubmitBtn onClick={handleSubmit}>등록</PostSubmitBtn>
        <CancelButton onClick={() => navigate('/mate/boards')}>
          취소
        </CancelButton>
      </BtnContainer>
    </ContainerBox>
  );
};

export default BoardPage;
