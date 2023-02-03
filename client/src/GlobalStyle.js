import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    font-family: 'Spoqa Han Sans Neo', 'IBM Plex Sans KR',"Helvetica", "Arial", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    line-height: 1.5;
    background-color: var(--bg-color);
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
    background: none;
    border: none;
  }

  a{
    text-decoration: none;

    &:visited{
      text-decoration: none;
      color: none;
    }
  }

  /* input 기본 스타일 초기화 */
  /* input { 
    -webkit-appearance : none;
    -moz-appearance:none; 
    appearance:none;
    &:focus {
      outline: none;
    }
  } */

  li{
    list-style: none;
  }

  .hidden{
    visibility: hidden;
  }
  
  .App{
    background-color: var(--bg-color);
    width:100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }

  :root {
    --header-height: 80px;

    /** color */
    --bg-color: #fbf7f2;
    --bg-dark-color: #EDE9E1;
    --main-color: #CA7C62;
    --sec-color: #A79689;
    --main-font-color: #401809;
    --error-color: #D64751;
    --success-color: #4a934a;
  }         
`;

export default GlobalStyle;
