import styled from 'styled-components';
import { lighten } from 'polished';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const NextArrowButton = styled.div`
  color: var(--main-color);
  cursor: pointer;
  position: absolute;
  z-index: 19;
  right: 0;
  top: 40%;
  &.slick-disabled {
    color: ${lighten(0.2, '#A79689')};
  }
`;

const PrevArrowButton = styled.button`
  color: var(--main-color);
  cursor: pointer;
  position: absolute;
  z-index: 19;
  left: 0;
  top: 40%;
  &.slick-disabled {
    color: ${lighten(0.2, '#A79689')};
  }
`;

export const NextArrow = ({ onClick, currentSlide, slideCount, size }) => {
  return (
    <NextArrowButton
      onClick={onClick}
      className={currentSlide === slideCount - 1 ? 'slick-disabled' : ''}
    >
      <IoIosArrowForward size={size}></IoIosArrowForward>
    </NextArrowButton>
  );
};

export const PrevArrow = ({ onClick, currentSlide, size }) => {
  return (
    <PrevArrowButton
      onClick={onClick}
      className={currentSlide === 0 ? 'slick-disabled' : ''}
    >
      <IoIosArrowBack size={size}></IoIosArrowBack>
    </PrevArrowButton>
  );
};
