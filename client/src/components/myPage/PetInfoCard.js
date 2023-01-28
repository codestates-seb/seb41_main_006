import styled from 'styled-components';
import Title from '../common/Title';
import PetProfileImage from '../common/PetProfileImage';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--main-font-color);

  > .image-box {
    width: 100%;
    height: 15rem;
    border-radius: 10px;
  }

  > .info {
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
`;

const PetInfoCard = ({ pet }) => {
  return (
    <CardContainer>
      <div className="image-box">
        <PetProfileImage
          src={pet?.profileImage?.upFileUrl}
          alt=""
        ></PetProfileImage>
      </div>
      <Title as="h3" size="small">
        {pet?.name}
      </Title>
      <div className="info">
        <div>🐶 {pet?.age}살</div>
        <div>{pet?.gender === 'M' ? '수컷' : '암컷'}</div>
        <div>{pet?.breed}</div>
      </div>
      <div className="Introduce">{pet?.aboutDog}</div>
    </CardContainer>
  );
};

export default PetInfoCard;
