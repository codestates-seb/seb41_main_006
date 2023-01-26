import styled from 'styled-components';

const InfoContainer = styled.li`
  background-color: var(--main--bgcolor);
  text-align: center;
  width: 100%;
  padding: 20px 0;
  border: 2px solid var(--sec-color);
  border-radius: 10px;
  margin-top: 20px;
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

const ChoosePetInfo = ({ setPetid, pets }) => {
  const handlePetId = () => {
    setPetid(pets.petId);
  };
  return (
    <InfoContainer onClick={handlePetId}>
      <img
        src="https://i.ibb.co/Rj5b3xs/Kakao-Talk-Photo-2023-01-12-00-46-38.jpg"
        alt="petimage"
      />
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
