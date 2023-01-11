import { css } from 'styled-components';

export const media = {
  tablet: (...args) => css`
    @media (max-width: 980px) {
      ${css(...args)}
    }
  `,

  mobile: (...args) => css`
    @media (max-width: 640px) {
      ${css(...args)}
    }
  `,
};

const titleSize = {
  large: '2rem',
  medium: '1.75rem',
  small: '1.25rem',
};

export const title = (size = 'medium') => css`
  color: var(--main-font-color);
  font-size: ${titleSize[size]};
  font-weight: 600;
`;
