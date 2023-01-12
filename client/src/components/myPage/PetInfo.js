import styled from 'styled-components';
import PetInfoCard from './PetInfoCard';
import { petInfo } from '../../static/dummyMyPetinfo';
import { FaDog } from 'react-icons/fa';

const PetContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  width: 100%;
  justify-content: center;
  li {
    margin: 0 10px 10px 10px;
  }
`;
const Saddbutton = styled.button`
  width: 30%;
  height: 30px;
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
      <h2>강아지 정보</h2>
      <PetContainer>
        {petInfo.map((el) => (
          <li key={el.id}>
            <PetInfoCard pet={el} />
          </li>
        ))}
      </PetContainer>
      <Saddbutton className="Addbutton">
        <FaDog /> 추가
      </Saddbutton>
    </>
  );
};

export default PetInfo;
