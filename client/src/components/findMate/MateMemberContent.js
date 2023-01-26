import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMemberList } from '../../api/member/member';
import styled from 'styled-components';
import MateMemberList from './MateMemeberList';
import MemberFilterModal from './MemberFilterModal';
import Button from '../common/Button';
import Title from '../common/Title';
import { flexColCenter, flexRowCenter } from '../../style/styleVariable';
import { MdFilterListAlt } from 'react-icons/md';

const MembersContentLayOut = styled.div`
  ${flexColCenter}
  padding: 2rem;
`;

const MembersContentBox = styled.div`
  ${flexRowCenter}
  width: 100%;
  justify-content: space-between;
`;

const MateMemberContent = ({ placeCode }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsFilterModalOpen(true);
  };

  const { data, isLoading } = useQuery(
    ['members', placeCode],
    async () => await getMemberList({ page: 1, size: 10, placeCode })
  );

  return (
    <MembersContentLayOut>
      <MembersContentBox>
        <Title as="h3" size="medium">
          산책 메이트
        </Title>
        <Button color="second" size="small" outline onClick={openModalHandler}>
          <MdFilterListAlt />
          상세 조건
        </Button>
      </MembersContentBox>
      {isLoading ? <div>loading...</div> : <MateMemberList memberList={data} />}

      {isFilterModalOpen ? (
        <MemberFilterModal setIsFilterModalOpen={setIsFilterModalOpen} />
      ) : null}
    </MembersContentLayOut>
  );
};

export default MateMemberContent;
