import clsx from 'clsx';
import { FC, useRef } from 'react'
import ArrowButtons from './ArrowButtons'
import useArrowSlider from '../hooks/useArrowSlider';
import { ArrowSliderProps } from './ArrowSliderTypes';

const ArrowSlider: FC<ArrowSliderProps> = ({ children, className, ...props}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { slideIndex, slideCount, handleNextSlideClick, handlePrevSlideClick } = useArrowSlider(sliderRef);
  
  const sliderClass = clsx('element-arrow-slider', className);

  return (
    <div className='element-slider'>
      <div 
        ref={sliderRef} 
        className={sliderClass} 
        {...props}
      >
        {children}
      </div>
      <ArrowButtons
        slideIndex={slideIndex}
        slideCount={slideCount}
        onNextArrowClick={handleNextSlideClick}
        onPrevArrowClick={handlePrevSlideClick}
      />
    </div>
  )
}

export default ArrowSlider