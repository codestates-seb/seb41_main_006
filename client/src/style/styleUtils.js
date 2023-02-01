import { css } from 'styled-components';

export const media = {
  tablet: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)}
    }
  `,

  mobile: (...args) => css`
    @media (max-width: 640px) {
      ${css(...args)}
    }
  `,
};
