import { FC, useMemo } from 'react';
import { ArrowButtonsProps } from './ArrowSliderTypes';

const ArrowButtons: FC<ArrowButtonsProps> = ({ slideCount, slideIndex, onPrevArrowClick: onPrexArrowClick, onNextArrowClick, ...props }) => {
  const prevState = useMemo(() => slideIndex === 0, [slideIndex]);
  const nextState = useMemo(() => slideIndex === slideCount, [slideIndex, slideCount]);

  return (
    <div className="element-arrow-buttons" {...props}>
      <button className='element-arrow-button' disabled={prevState} onClick={onPrexArrowClick}>
        &#10094;
      </button>
      <button className='element-arrow-button' disabled={nextState} onClick={onNextArrowClick}>
        &#10095;
      </button>
    </div>
  );
};

export default ArrowButtons;
