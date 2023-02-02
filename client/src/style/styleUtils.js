import { css } from 'styled-components';

export const media = {
  desktop: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 980px) {
      ${css(...args)}
    }
  `,

  mobile: (...args) => css`
    @media (max-width: 767px) {
      ${css(...args)}
    }
  `,
};
