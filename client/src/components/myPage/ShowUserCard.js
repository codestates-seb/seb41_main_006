import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import { PostSubmitBtn } from '../Button';

const CardContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-bottom: 1%;
  }
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .Userinfo {
    width: 100%;
    display: flex;
    justify-content: center;
    div {
      margin-right: 10px;
      font-weight: 700;
    }
    span {
      margin-left: 5%;
    }
  }
  .Address {
    display: flex;
    justify-content: space-between;
    .Address_location {
      font-weight: 700;
      margin-right: 5px;
    }
  }
  .Introduce {
    margin-top: 5%;
    height: 70px;
    text-align: center;
  }
`;
const Chatbtn = styled(PostSubmitBtn)`
  font-size: 1.2rem;
  border-radius: 5px;
`;
const ShowUserCard = ({ dummyUserInfo }) => {
  return (
    <CardContainer>
      <img src={dummyUserInfo.profile_img} alt="" />
      <div>{dummyUserInfo.nickname}</div>
      <div className="Userinfo">
        <div>
          <BsFillPersonFill />
          정보
        </div>
        <span>{dummyUserInfo.age}</span>
        <span>{dummyUserInfo.male ? '남' : '여'}</span>
      </div>
      <div className="Address">
        <div className="Address_location">
          <IoLocationSharp />
          지역
        </div>
        <div>{dummyUserInfo.address}</div>
      </div>
      <div className="Introduce">{dummyUserInfo.introduce}</div>
      <Chatbtn width="250" height="40">
        채팅하기
      </Chatbtn>
    </CardContainer>
  );
};
export default ShowUserCard;
