import styled from 'styled-components';

export const PostSubmitBtn = styled.button`
  color: white;
  width: ${(props) => (props.width ? props.width : '96')}px;
  height: ${(props) => (props.height ? props.height : '55')}px;
  /* border-radius: 4px; */
  padding: 7px 12px;
  border: none; /* border: 1px solid #398df7; */
  background-color: #ca7c62;
  /* box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px; */

  /* :hover {
    background-color: #0074cc;
  }
  :active {
    outline: var(--outline-btn-press);
  } */
`;

export const CancelButton = styled.button`
  color: #ca7c62;
  width: ${(props) => (props.width ? props.width : '96')}px;
  height: ${(props) => (props.height ? props.height : '55')}px;
  border-radius: 4px;
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #ca7c62;
  /* :hover {
    background-color: #f1f8fe;
  }
  :active {
    outline: var(--outline-btn-press);
  } */
`;

export const StateButton = styled.button`
  color: #ffffff;
  height: ${(props) => (props.height ? props.height : '24')}px;
  border-radius: 20px;
  padding: 0px 12px;
  /* margin-right: 3px; */
  border: none; // border: 1px solid #9eb9d0;
  background-color: #b7a69e;
  /* box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;

  :hover {
    background-color: #b9d2e8;
  }
  :active {
    outline: var(--outline-btn-press);
  } */
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
  /* font-family: var(--font-family-tag); */

  :hover {
    background-color: var(--main-font-color);
  }
`;

export const PageButton = styled.button`
  color: ${(props) => (props.selected ? 'white' : 'var(--font-color-title)')};
  padding: 5px 10px;
  border: 1px solid var(--line-color);
  border-radius: 4px;
  margin-right: 4px;
  vertical-align: baseline;
  font-size: var(--font-size-0-8rem);
  font-family: var(--font-family-tag);
  background-color: ${(props) =>
    props.selected ? 'var(--line-color-top-orange)' : 'white'};

  :hover {
    background-color: #d7d9dc;
  }
`;
