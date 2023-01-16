import styled from 'styled-components';

export const PostSubmitBtn = styled.button`
  color: white;
  width: ${(props) => (props.width ? props.width : '96')}px;
  height: ${(props) => (props.height ? props.height : '55')}px;
  padding: 6px 12px;
  border: none;
  background-color: #ca7c62;

  :hover {
    background-color: #b86346;
  }
`;

export const CancelButton = styled.button`
  color: #ca7c62;
  width: ${(props) => (props.width ? props.width : '96')}px;
  height: ${(props) => (props.height ? props.height : '55')}px;
  border-radius: 4px;
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #ca7c62;

  :hover {
    border: 1px solid #b86346;
    color: #b86346;
  }
`;

export const OpenBtn = styled.button`
  color: #ffffff;
  height: ${(props) => (props.height ? props.height : '24')}px;
  border-radius: 20px;
  padding: 0px 12px 1.2px 12px;
  border: none;
  background-color: #ca7c62;

  :hover {
    background-color: #b86346;
  }
`;

export const CloseBtn = styled.button`
  color: #ffffff;
  height: ${(props) => (props.height ? props.height : '24')}px;
  border-radius: 20px;
  padding: 0px 12px 1.2px 12px;
  border: none;
  background-color: #b7a69e;

  :hover {
    background-color: #8c807a;
  }
`;

export const CommentBtn = styled.button`
  width: 66px;
  height: 33px;
  background-color: #a79689;
  color: #ffffff;
  padding: 3px 7px;
  border: none;
  border-radius: 10px;
  margin-right: 6px;
  font-size: 16px;

  :hover {
    background-color: var(--main-font-color);
  }
`;
