import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import { deleteMyPet } from '../../api/pet/pet';
import styled from 'styled-components';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import PetInfoCard from './PetInfoCard';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 25.5rem;
  color: var(--main-font-color);
  padding: 0 1rem;

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

const EditPetInfoCard = ({ pet, setEditPet, setIsEditModalOpen }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const deletePetMutation = useMutation(deleteMyPet, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myPets']);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const deletePet = (petId) => {
    deletePetMutation.mutate({ petId });
  };

  const openEdit = (pet) => {
    setEditPet(pet);
    setIsEditModalOpen(true);
  };

  const handleClickPetDelete = () => {
    dispatch(
      openModal({
        type: 'delete',
        props: {
          petId: pet.petId,
          handlePetDelete: deletePet,
          message: '강아지 정보를 삭제하시겠습니까?',
        },
      })
    );
  };

  return (
    <CardContainer>
      <PetInfoCard pet={pet} />
      <div className="edit">
        <button>
          <MdModeEdit
            size="16"
            onClick={() => {
              openEdit(pet);
            }}
          />
        </button>
        <button onClick={handleClickPetDelete}>
          <RiDeleteBinFill size="16" />
        </button>
      </div>
    </CardContainer>
  );
};

export default EditPetInfoCard;
