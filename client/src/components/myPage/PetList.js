// import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMyPetList } from '../../api/pet/pet';
import { GrayDog } from '../common/DogSvg';
import EditPetInfoCard from './EditPetInfoCard';

import styled from 'styled-components';

const SPetList = styled.ul`
  width: 80%;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  overflow-x: scroll;
  gap: 1.5rem;
  padding: 1rem;

  // 스크롤바 가리기
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoPetBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  > .dog-face {
    width: 13rem;
    height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .no-pets-msg {
    margin-top: 1rem;
    font-weight: 500;
  }
`;

const PetList = () => {
  const { data: petList, isLoading } = useQuery(
    ['myPets'],
    async () => await getMyPetList({ page: 1, size: 10 }),
    {
      placeholderData: [],
    }
  );

  if (isLoading) {
    <div>...loading</div>;
  }

  return petList?.length === 0 ? (
    <NoPetBox className="no-pets--wrapper">
      <div className="dog-face">
        <GrayDog></GrayDog>
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
