import styled from 'styled-components';
import { BrownDog } from '../common/DogSvg';

const InfoContainer = styled.li`
  background-color: var(--main--bgcolor);
  text-align: center;
  width: 100%;
  padding: 20px 0;
  border: 2px solid var(--sec-color);
  border-radius: 10px;
  margin-top: 20px;
  float: left;
  img,
  svg {
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

const ChoosePetInfo = ({ setPetid, pets }) => {
  const handlePetId = () => {
    setPetid(pets.petId);
  };
  return (
    <InfoContainer onClick={handlePetId}>
      {pets?.profileImage ? (
        <img src={pets?.profileImage?.upFileUrl} alt="petimage" />
      ) : (
        <BrownDog></BrownDog>
      )}
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
