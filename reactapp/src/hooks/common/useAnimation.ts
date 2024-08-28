import { RefObject, useCallback, useEffect } from 'react';

const isElementInViewPort = (bounding: DOMRect): boolean => {
  return bounding.top < window.innerHeight && bounding.bottom >= 0;
};

const useAnimation = (animateRef: RefObject<HTMLElement>) => {
  const animateElement: HTMLElement | null = animateRef.current;

  const checkVisibility = useCallback(() => {
    if (!animateElement) return;
    const elementDimensions: DOMRect = animateElement.getBoundingClientRect();
    const isInViewPort: boolean = isElementInViewPort(elementDimensions);
    if (!isInViewPort) return;
    animateElement.classList.add('showing');
  }, [animateElement]);

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility);
    return () => window.removeEventListener('scroll', checkVisibility);
  }, [checkVisibility]);
};

export default useAnimation;
