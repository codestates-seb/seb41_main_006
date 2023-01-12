import styled from 'styled-components';
import { MdModeEdit } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';

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
    width: 100%;
    height: 20rem;
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
  .Edit {
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

const EditPetInfoCard = ({ pet, setEditModal, EditModal }) => {
  return (
    <CardContainer>
      <img src={pet.pet_img} alt=""></img>
      <div>{pet.name}</div>
      <div className="Info">
        <div>🐶 {pet.age}살</div>
        <div>{pet.male ? '남' : '여'}</div>
        <div>{pet.breed}</div>
      </div>
      <div className="Introduce">{pet.Introduce}</div>
      <div className="Edit">
        <button>
          <MdModeEdit
            size="20"
            onClick={() => {
              setEditModal(!EditModal);
            }}
          />
        </button>
        <button>
          <RiDeleteBinFill size="20" />
        </button>
      </div>
    </CardContainer>
  );
};

export default EditPetInfoCard;
