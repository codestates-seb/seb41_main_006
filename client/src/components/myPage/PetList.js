import { useQuery } from 'react-query';
import { getMyPetList } from '../../api/pet/pet';
import styled from 'styled-components';
import EditPetInfoCard from './EditPetInfoCard';
import DogFace from '../../static/images/dogFace.svg';

const SPetList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: center;
  li {
    margin: 0 10px 10px 10px;
  }
`;

const NoPetBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  > .dog-face {
    width: 10rem;
  }

  > .no-pets-msg {
    margin-top: 1rem;
    font-weight: 500;
  }
`;

const PetList = () => {
  const { data: petList, isLoading } = useQuery({
    queryKey: ['myPets'],
    queryFn: async () => await getMyPetList({ page: 1, size: 10 }),
  });

  if (isLoading) {
    <div>...loading</div>;
  }

  return petList?.length === 0 ? (
    <NoPetBox className="no-pets--wrapper">
      <div className="dog-face">
        <DogFace></DogFace>
      </div>
      <div className="no-pets-msg">현재 등록된 강아지가 없어요!</div>
    </NoPetBox>
  ) : (
    <SPetList>
      {petList?.map((el) => (
        <li key={el.petId}>
          <EditPetInfoCard pet={el} />
        </li>
      ))}
    </SPetList>
  );
};

export default PetList;
