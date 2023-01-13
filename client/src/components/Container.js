import styled from 'styled-components';

const Container = styled.div`
  margin-top: var(--header-height);
  background-color: var(--bg-color);
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - var(--header-height));
`;

export default Container;
