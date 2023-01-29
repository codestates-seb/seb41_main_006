import { useState } from 'react';
import styled from 'styled-components';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import PetInfoCard from './PetInfoCard';
import EditPetModal from './Modal/EditPetModal';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 17.5rem;
  height: 25rem;
  color: var(--main-font-color);

  > .edit {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin: 0 5px;
      border: none;
      cursor: pointer;

      &:hover {
        color: var(--main-color);
      }
    }
  }
`;

const EditPetInfoCard = ({ pet }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <>
      <CardContainer>
        <PetInfoCard pet={pet} />
        <div className="edit">
          <button>
            <MdModeEdit
              size="16"
              onClick={() => {
                setIsEditModalOpen(true);
              }}
            />
          </button>
          <button>
            <RiDeleteBinFill size="16" />
          </button>
        </div>
      </CardContainer>
      {isEditModalOpen ? (
        <EditPetModal pet={pet} setIsEditModalOpen={setIsEditModalOpen} />
      ) : null}
    </>
  );
};

export default EditPetInfoCard;
