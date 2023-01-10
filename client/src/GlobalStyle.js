import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  button{
    cursor: pointer;
  }

  a{
    text-decoration: none;

    &:visited{
      text-decoration: none;
      color: none;
    }
  }

  /* input 기본 스타일 초기화 */
  input { 
    -webkit-appearance : none;
    -moz-appearance:none; 
    appearance:none;
    &:focus {
      outline: none;
    }
  }


  .App{
    background-color: var(--bg-color);
    width: 100vw;
    min-height: 100vh;
    height: 100vh;
    display: flex;
    justify-content: center;
  }

  :root {
    --header-height: 90px;

    /** color */
    --bg-color: #fbf7f2;
    --bg-dark-color: #EDE9E1;
    --main-color: #CA7C62;
    --sec-color: #A79689;
    --main-font-color: #401809;
  }         
`;

export default GlobalStyle;
