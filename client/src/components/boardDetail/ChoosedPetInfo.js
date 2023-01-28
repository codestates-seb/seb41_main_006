import styled from 'styled-components';
import ProfileImage from '../common/ProfileImage';

const InfoContainer = styled.div`
  background-color: var(--main--bgcolor);
  text-align: center;
  width: 25%;
  padding: 20px 0;
  border: 2px solid var(--sec-color);
  border-radius: 10px;
  margin: 20px 0;
  float: left;
  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin: 0px 10px;
  }
  .pet-name {
    margin-top: 5px;
  }
  span {
    margin: 0 2px;
  }
`;

const ChoosePetInfo = ({ pets }) => {
  return (
    <InfoContainer>
      <ProfileImage src={pets.profileImage?.upFileUrl} alt="petimage" />
      <div className="pet-name">{pets.name}</div>
      <div>
        <span>{pets.gender === 'M' ? '남' : '여'}</span>
        <span>|</span>
        <span>{pets.age}살</span>
        <span>|</span>
        <span>{pets.breed}</span>
      </div>
    </InfoContainer>
  );
};

export default ChoosePetInfo;
