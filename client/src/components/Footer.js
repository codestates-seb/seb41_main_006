import styled from 'styled-components';
// import footerImg from '../static/images/FooterTop-image.png';
import footerImage from '../static/images/FooterImage.png';

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
const SfooterImg = styled.img`
  width: 100%;
`;

const Footer = () => {
  const url = 'https://github.com/codestates-seb/seb41_main_006';
  return (
    <>
      <SfooterImg src={footerImage} alt="footerImg" />
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
