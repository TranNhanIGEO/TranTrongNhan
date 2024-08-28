import { RefObject, useCallback, useEffect, useRef } from 'react';

const useScrollable = (scrollRef: RefObject<HTMLElement>) => {
  const scrollElement: HTMLElement | null = scrollRef.current;
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (!scrollElement) return;
    scrollElement.classList.add('scrolling');

    if (!!scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      scrollElement.classList.remove('scrolling');
    }, 1000);
  }, [scrollElement]);

  useEffect(() => {
    if (!scrollElement) return;
    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [scrollElement, handleScroll]);
};

export default useScrollable;
