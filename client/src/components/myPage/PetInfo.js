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
  > div {
    width: 20rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* box-shadow: 4px 4px 10px 10px rgba(0, 0, 0, 0.05); */
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
