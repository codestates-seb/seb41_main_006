import styled from 'styled-components';
import Title from '../common/Title';
import PetProfileImage from '../common/PetProfileImage';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--main-font-color);
  > * {
    margin: 1% 0;
  }
  img {
    width: 15rem;
    height: 12rem;
    border-radius: 10px;
  }
  .Info {
    display: flex;
    > div {
      text-align: center;
    }
    > :nth-child(2) {
      border-left: 1px solid black;
      border-right: 1px solid black;
      border-color: var(--main-font-color);
      margin: 0 10px;
      padding: 0 10px;
    }
  }
  .Introduce {
  }
`;

const PetInfoCard = ({ pet }) => {
  return (
    <CardContainer>
      <PetProfileImage src={pet?.profileImage} alt=""></PetProfileImage>
      <Title as="h3" size="small">
        {pet?.name}
      </Title>
      <div className="Info">
        <div>🐶 {pet?.age}살</div>
        <div>{pet?.gender === 'M' ? '수컷' : '암컷'}</div>
        <div>{pet?.breed}</div>
      </div>
      <div className="Introduce">{pet?.aboutDog}</div>
    </CardContainer>
  );
};

export default PetInfoCard;
