import { useState, useEffect, useRef } from 'react';

const useBannerSlider = (slideCount: number) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const refreshInterval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (slideCount === 0) return;
    const nextSlide = () => setSlideIndex(prevIndex => (prevIndex + 1) % slideCount);
    refreshInterval.current = setInterval(nextSlide, 3000);
    return () => clearInterval(refreshInterval.current);
  }, [slideCount]);

  const startInterval = () => {
    clearInterval(refreshInterval.current);
    refreshInterval.current = setInterval(handleNextSlide, 3000);
  };

  const handleMouseOver = () => {
    clearInterval(refreshInterval.current);
  };

  const handleMouseOut = () => {
    startInterval();
  };

  const handleNextSlide = () => {
    setSlideIndex(prevIndex => (prevIndex + 1) % slideCount);
    startInterval();
  };

  const handlePrevSlide = () => {
    setSlideIndex(prevIndex => (prevIndex - 1 + slideCount) % slideCount);
    startInterval();
  };

  const handleToSlide = (index: number) => {
    setSlideIndex(index);
    startInterval();
  };

  return {
    slideIndex,
    handleNextSlide,
    handlePrevSlide,
    handleToSlide,
    handleMouseOver,
    handleMouseOut,
  };
};

export default useBannerSlider;
