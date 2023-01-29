import { useState } from 'react';
import styled from 'styled-components';
import PetList from './PetList';
import { FaDog } from 'react-icons/fa';
import AddPetInfoModal from './Modal/AddPetInfoModal';

const PetContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Saddbutton = styled.button`
  width: 20rem;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <h2>강아지 정보</h2>
      <PetContainer>
        <PetList />
      </PetContainer>
      <Saddbutton
        className="add-button"
        onClick={() => {
          setIsAddModalOpen(true);
        }}
      >
        <FaDog />
        <span>추가</span>
      </Saddbutton>
      {isAddModalOpen ? (
        <AddPetInfoModal setIsAddModalOpen={setIsAddModalOpen} />
      ) : (
        ''
      )}
    </>
  );
};

export default PetInfo;
