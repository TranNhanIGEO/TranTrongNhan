import React, { useEffect, useState } from 'react';

const useArrowSlider = (sliderRef: React.RefObject<HTMLElement>) => {
  const sliderElement: HTMLElement | null = sliderRef.current;
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [slideCount, setSlideCount] = useState<number>(0);

  const handleNextSlideClick = () => {
    if (!sliderElement) return;
    sliderElement.scrollLeft += sliderWidth;
    setSlideIndex(prev => prev++);
  };

  const handlePrevSlideClick = () => {
    if (!sliderElement) return;
    sliderElement.scrollLeft -= sliderWidth;
    setSlideIndex(prev => prev--);
  };

  useEffect(() => {
    if (!sliderElement) return;
    const sliderDimensions: DOMRect = sliderElement?.getBoundingClientRect();
    const sliderWidth: number = sliderDimensions.width;
    setSliderWidth(sliderWidth);
    const slideCount: number = Math.ceil(sliderElement.scrollWidth / sliderWidth);
    setSlideCount(slideCount);
  }, [sliderElement]);

  return {
    slideIndex,
    slideCount,
    handleNextSlideClick,
    handlePrevSlideClick,
  };
};

export default useArrowSlider;
