import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import PropTypes from 'prop-types';

const colors = {
  main: '#CA7C62',
  second: '#A79689',
};

const colorStyles = css`
  ${({ color }) => {
    const selected = colors[color] ? colors[color] : color;
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${lighten(0.1, selected)};
            color: white;
          }
        `}
      ${({ letter }) =>
        letter &&
        css`
          color: ${selected};
          background: none;
          &:hover {
            background: none;
            outline: 1px solid ${selected};
          }
          &:active {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem',
    padding: '1.5rem',
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
    padding: '0.8rem',
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem',
    padding: '0.5rem',
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
    padding-left: ${sizes[size].padding};
    padding-right: ${sizes[size].padding};
  `}
`;

const fullWidthStyle = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;
const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  cursor: pointer;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }

  ${fullWidthStyle}
`;

function Button({
  children,
  color,
  size,
  outline,
  fullWidth,
  letter,
  ...rest
}) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      letter={letter}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: 'main',
  size: 'medium',
};

Button.propTypes = {
  children: PropTypes.oneOfType([(PropTypes.element, PropTypes.string)]),
  color: PropTypes.string,
  size: PropTypes.string,
  outline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  letter: PropTypes.bool,
};

export default Button;
