import styled from 'styled-components';

const PetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  color: var(--main-font-color);
  > * {
    margin: 1% 0;
  }
  .img {
    background-color: white;
    width: 35%;
    height: 200px;
    border-radius: 10px;
  }
  .Info {
    display: flex;
    width: 35%;
    justify-content: space-around;
    > div {
      text-align: center;
      width: 30%;
    }
    > :nth-child(2) {
      border-left: 1px solid black;
      border-right: 1px solid black;
      border-color: var(--main-font-color);
    }
  }
  .Introduce {
    width: 35%;
  }
  .Edit {
    width: 35%;
    display: flex;
    justify-content: end;
    button {
      margin: 0 5px;
      border: none;
      background-color: var(--bg-color);
      cursor: pointer;
    }
  }
`;
const Saddbutton = styled.button`
  width: 20%;
  height: 25px;
  background-color: var(--bg-color);
  border: 0.5px solid var(--main-font-color);
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5%;
  :active {
    background-color: var(--main-font-color);
  }
`;

const PetInfo = () => {
  return (
    <>
      <PetInfoContainer>
        <h2>강아지 정보</h2>
        <div className="img"></div>
        <div>강아지 이름</div>
        <div className="Info">
          <div>🐶 나이</div>
          <div>성별</div>
          <div>견종</div>
        </div>
        <div className="Introduce">
          인사말인사말인사말인사말인사말인사말인사말인사말인사말인사말인사말인사말
        </div>
        <div className="Edit">
          <button>🖊️</button>
          <button>🗑️</button>
        </div>
      </PetInfoContainer>
      <Saddbutton className="Addbutton">🐶 추가</Saddbutton>
    </>
  );
};

export default PetInfo;
