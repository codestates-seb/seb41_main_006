import styled from 'styled-components';

const titleSize = {
  large: '2rem',
  medium: '1.8rem', // 28px
  small: '1.5rem', //24px
  xsmall: '1.25rem',
};

const StyledTitle = styled.h1`
  color: var(--main-font-color);
  font-size: ${({ size }) => titleSize[size]};
  font-weight: 600;
`;

/**
 * 제목 컴포넌트 생성
 */
const Title = ({ children, as, size }) => {
  return (
    <StyledTitle as={as} size={size}>
      {children}
    </StyledTitle>
  );
};

/**
 * @property {string} size - 글자 크기 지정
 * @property {string} as - 태그 지정
 */
Title.defaultProps = {
  size: 'medium',
  as: 'h1',
};

export default Title;
