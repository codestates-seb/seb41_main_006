import styled from 'styled-components';

const SFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin: 1%;
  }
  button {
    font-size: 1rem;
  }
`;

const Footer = () => {
  const url = 'https://github.com/codestates-seb/seb41_main_006';
  return (
    <SFooter>
      <div>© Copyright ⓒ 2023 킁킁메이트</div>
      <div>FE : 채예린 , 강선영 , 조규성</div>
      <div>BE : 정민교 , 나혜리 , 김정하</div>
      <button
        onClick={() => {
          window.open(url);
        }}
      >
        킁킁메이트 Github
      </button>
    </SFooter>
  );
};

export default Footer;
