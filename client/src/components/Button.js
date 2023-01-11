import styled from 'styled-components';

export const CheckButton = styled.button`
  color: white;
  height: ${(props) => (props.height ? props.height : '32')}px;
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
  height: ${(props) => (props.height ? props.height : '32')}px;
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

export const TagButton = styled.button`
  background-color: #e1ecf4;
  color: #3a739d;
  padding: 3px 7px;
  border-radius: 4px;
  margin-right: 6px;
  font-size: var(--font-size-0-8rem);
  font-family: var(--font-family-tag);

  :hover {
    background-color: #d4e2ef;
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
