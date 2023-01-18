import styled from 'styled-components';
import { useState } from 'react';
import Title from '../common/Title';
import EditMemberModal from './Modal/EditMemberModal';
import MemberInfoCard from './MemberInfoCard';
import WithdrawalModal from '../WithdrawalModal';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 1.5rem;
  .edit-account {
    width: 15%;
    height: 40px;
    background-color: var(--sec-color);
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: var(--main-font-color);
      color: white;
    }
  }
  .delete-account {
    cursor: pointer;
    background-color: var(--bg-color);
    border: none;
    :visited {
      color: var(--sec-color);
    }
  }
`;

const MemberInfo = ({ member }) => {
  const [Modal, setModal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  return (
    <>
      <UserInfoContainer>
        <Title as="h2">나의 정보</Title>
        <MemberInfoCard memberInfo={member} />
        <button
          className="edit-account"
          onClick={() => {
            setModal(!Modal);
          }}
        >
          정보 수정
        </button>
        <button
          className="delete-account"
          onClick={() => {
            setDeleteModal(!DeleteModal);
          }}
        >
          회원 탈퇴
        </button>
      </UserInfoContainer>
      {Modal ? <EditMemberModal setModal={setModal} Modal={Modal} /> : ''}
      {DeleteModal ? <WithdrawalModal /> : ''}
    </>
  );
};

export default MemberInfo;

// import { useState } from 'react';
// import styled from 'styled-components';
// import Title from '../common/Title';
// import EdituserModal from './Modal/EdituserModal';
// import UserInfoCard from './UsetInfoCard';
// import WithdrawalModal from '../WithdrawalModal';
// import { dummyUserInfo } from '../../static/dummyUserInfo';

// const UserInfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 70%;
//   gap: 1.5rem;
//   .edit-account {
//     width: 15%;
//     height: 40px;
//     background-color: var(--sec-color);
//     color: white;
//     font-size: 1.2rem;
//     border: none;
//     border-radius: 10px;
//     cursor: pointer;
//     :hover {
//       background-color: var(--main-font-color);
//       color: white;
//     }
//   }
//   .delete-account {
//     cursor: pointer;
//     background-color: var(--bg-color);
//     border: none;
//     :visited {
//       color: var(--sec-color);
//     }
//   }
// `;

// const UserInfo = () => {
//   const [Modal, setModal] = useState(false);
//   const [DeleteModal, setDeleteModal] = useState(false);
//   return (
//     <>
//       <UserInfoContainer>
//         <Title as="h2">나의 정보</Title>
//         <UserInfoCard userInfo={dummyUserInfo[0]} />
//         <button
//           className="edit-account"
//           onClick={() => {
//             setModal(!Modal);
//           }}
//         >
//           정보 수정
//         </button>
//         <button
//           className="delete-account"
//           onClick={() => {
//             setDeleteModal(!DeleteModal);
//           }}
//         >
//           회원 탈퇴
//         </button>
//       </UserInfoContainer>
//       {Modal ? <EdituserModal setModal={setModal} Modal={Modal} /> : ''}
//       {DeleteModal ? <WithdrawalModal /> : ''}
//     </>
//   );
// };

// export default UserInfo;
