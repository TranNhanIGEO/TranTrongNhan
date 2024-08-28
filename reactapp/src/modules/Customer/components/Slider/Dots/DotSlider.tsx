import './DotSlider.scss';
import clsx from 'clsx';
import { FC, useRef } from 'react';
import { DotSliderProps } from './DotSliderTypes';
import DotButtons from './DotButtons';
import useDotSlider from 'modules/Customer/components/Slider/hooks/useDotSlider';

const DotSlider: FC<DotSliderProps> = ({ children, className, ...props }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { slideIndex, slideCount, handleDotClick } = useDotSlider(sliderRef);

  const sliderClass = clsx('element-dot-slider', className);

  return (
    <div className='element-slider'>
      <div 
        ref={sliderRef} 
        className={sliderClass} 
        {...props}
      >
        {children}
      </div>
      <DotButtons 
        slideCount={slideCount} 
        slideIndex={slideIndex} 
        onDotClick={handleDotClick} 
      />
    </div>
  );
};

export default DotSlider;
