import styled from 'styled-components';
import EditPetInfoCard from './EditPetInfoCard';
import { petInfo } from '../../static/dummyMyPetinfo';
import { FaDog } from 'react-icons/fa';
import { useState } from 'react';
import EditPetModal from './EditPetModal';
import AddPetInfoModal from './AddPetInfoModal';

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
  const [EditModal, setEditModal] = useState(false);
  const [AddModal, setAddModal] = useState(false);
  return (
    <>
      <h2>강아지 정보</h2>
      <PetContainer>
        {petInfo.map((el) => (
          <li key={el.id}>
            <EditPetInfoCard
              pet={el}
              setEditModal={setEditModal}
              EditModal={EditModal}
            />
          </li>
        ))}
      </PetContainer>
      <Saddbutton
        className="Addbutton"
        onClick={() => {
          setAddModal(!AddModal);
        }}
      >
        <FaDog /> 추가
      </Saddbutton>
      {EditModal ? (
        <EditPetModal setEditModal={setEditModal} EditModal={EditModal} />
      ) : (
        ''
      )}
      {AddModal ? (
        <AddPetInfoModal AddModal={AddModal} setAddModal={setAddModal} />
      ) : (
        ''
      )}
    </>
  );
};

export default PetInfo;
