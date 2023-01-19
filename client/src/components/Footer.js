import styled from 'styled-components';
import footerImg from '../static/images/FooterTop-image.png';

const SFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ad8b73;
  width: 100%;
  height: 200px;
  > * {
    margin: 1%;
  }
  button {
    font-size: 1rem;
  }
`;
const SfooterImg = styled.div`
  background-image: url(${footerImg});
  width: 100%;
  height: 70px;
  background-size: 10%;
`;

const Footer = () => {
  const url = 'https://github.com/codestates-seb/seb41_main_006';
  return (
    <>
      <SfooterImg className="footerimg"></SfooterImg>
      <SFooter>
        <ul>
          <li>
            <button
              onClick={() => {
                window.open(url);
              }}
            >
              킁킁메이트 Github
            </button>
          </li>
        </ul>
        <div>© Copyright ⓒ 2023 킁킁메이트</div>
        <div>
          <div>Front-End : 채예린 , 강선영 , 조규성</div>
          <div>Back-End : 정민교 , 나혜리 , 김정하</div>
        </div>
      </SFooter>
    </>
  );
};

export default Footer;
