import { useState } from 'react';
import styled from 'styled-components';
import PetList from './PetList';
import AddPetInfoModal from './Modal/AddPetInfoModal';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaDog } from 'react-icons/fa';

const PetContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DogAddButton = styled.div`
  margin-top: 1rem;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: var(--bg-dark-color);
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.1);
  }
  &:active {
    color: white;
    background-color: var(--main-font-color);
  }
  > div {
    width: 20rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
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
      {isAddModalOpen ? (
        <AddPetInfoModal setIsAddModalOpen={setIsAddModalOpen} />
      ) : (
        ''
      )}
      <DogAddButton
        onClick={() => {
          setIsAddModalOpen(true);
        }}
      >
        <div>
          <FaDog />
          <AiOutlinePlus />
        </div>
      </DogAddButton>
    </>
  );
};

export default PetInfo;
