import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';

const CardContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-bottom: 1%;
  }
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .Userinfo {
    width: 50%;
    display: flex;
    justify-content: center;
    div {
      margin-right: 10%;
      font-weight: 700;
    }
    span {
      margin-left: 5%;
    }
  }
  .Address {
    width: 50%;
    display: flex;
    justify-content: space-between;
    .Address_location {
      font-weight: 700;
    }
  }
  .Introduce {
    margin-top: 5%;
    width: 50%;
    height: 100px;
    text-align: center;
  }
`;

const UserInfoCard = ({ dummyUserInfo }) => {
  return (
    <CardContainer>
      <h2>나의 정보</h2>
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
    </CardContainer>
  );
};

export default UserInfoCard;
