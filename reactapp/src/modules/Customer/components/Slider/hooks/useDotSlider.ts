import { RefObject, useCallback, useEffect, useState } from 'react';

const useDotSlider = (sliderRef: RefObject<HTMLElement>) => {
  const sliderElement: HTMLElement | null = sliderRef.current;
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [slideCount, setSlideCount] = useState<number>(0);

  const handleDotClick = (index: number) => {
    if (!sliderElement) return;
    sliderElement.scrollTo({ left: sliderWidth * index });
    setSlideIndex(index);
  };

  const handleSlideResize = useCallback(() => {
    if (!sliderElement) return;
    const sliderDimensions: DOMRect = sliderElement.getBoundingClientRect();
    const sliderWidth: number = sliderDimensions.width;
    setSliderWidth(sliderWidth);
    const slideCount: number = Math.ceil(sliderElement.scrollWidth / sliderWidth);
    setSlideCount(slideCount);
  }, [sliderElement]);

  const handleSlideScroll = useCallback(() => {
    if (!sliderElement) return;
    const slideIndex = Math.round(sliderElement.scrollLeft / sliderWidth);
    setSlideIndex(slideIndex);
  }, [sliderElement, sliderWidth])

  useEffect(() => {
    if (!sliderElement) return;
    handleSlideResize();
    window.addEventListener('resize', handleSlideResize);
    return () => window.removeEventListener('resize', handleSlideResize);
  }, [sliderElement, sliderElement?.childElementCount, handleSlideResize]);

  useEffect(() => {
    if (!sliderElement) return;
    sliderElement.addEventListener('scroll', handleSlideScroll);
    return () => sliderElement.removeEventListener('scroll', handleSlideScroll);
  }, [sliderElement, handleSlideScroll])

  return {
    slideIndex,
    slideCount,
    handleDotClick,
  };
};

export default useDotSlider;
