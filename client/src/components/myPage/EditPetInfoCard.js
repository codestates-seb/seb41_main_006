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
  width: 100%;
  color: var(--main-font-color);
  > * {
    margin: 1% 0;
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
  > .edit {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin: 0 5px;
      border: none;
      background-color: var(--bg-color);
      cursor: pointer;
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
              size="20"
              onClick={() => {
                setIsEditModalOpen(true);
              }}
            />
          </button>
          <button>
            <RiDeleteBinFill size="20" />
          </button>
        </div>
      </CardContainer>
      {isEditModalOpen ? (
        <EditPetModal pet={pet} setIsEditModalOpen={setIsEditModalOpen} />
      ) : (
        ''
      )}
    </>
  );
};

export default EditPetInfoCard;
