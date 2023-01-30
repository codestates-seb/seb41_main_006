import styled from 'styled-components';
import { lighten } from 'polished';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const NextArrowBox = styled.div`
  color: var(--main-color);

  cursor: pointer;
  &.slick-disabled {
    color: ${lighten(0.2, '#A79689')};
  }
`;
const PrevArrowBox = styled.div`
  color: var(--main-color);
  cursor: pointer;
  &.slick-disabled {
    color: ${lighten(0.2, '#A79689')};
  }
`;

export const NextArrow = ({ onClick, currentSlide, slideCount, size }) => {
  return (
    <NextArrowBox
      onClick={onClick}
      className={currentSlide === slideCount - 1 ? 'slick-disabled' : ''}
    >
      <IoIosArrowForward size={size}></IoIosArrowForward>
    </NextArrowBox>
  );
};

export const PrevArrow = ({ onClick, currentSlide, size }) => {
  return (
    <PrevArrowBox
      onClick={onClick}
      className={currentSlide === 0 ? 'slick-disabled' : ''}
    >
      <IoIosArrowBack size={size}></IoIosArrowBack>
    </PrevArrowBox>
  );
};
