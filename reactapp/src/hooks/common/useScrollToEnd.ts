import { RefObject, useCallback, useEffect, useState } from 'react';

const useScrollToEnd = (ref: RefObject<HTMLUListElement>) => {
  const parentElement: HTMLUListElement | null = ref.current;
  const [isAtEnd, setAtEnd] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!parentElement) return;
    const childrens = parentElement.querySelectorAll('li');
    const lastChildren = childrens[childrens.length - 1];

    if (!lastChildren) return;
    const parentBounds = parentElement.getBoundingClientRect();
    const lastChilBounds = lastChildren.getBoundingClientRect();
    const isAtEnd = parentBounds.bottom >= lastChilBounds.bottom;
    setAtEnd(isAtEnd);
  }, [parentElement]);

  useEffect(() => {
    if (!parentElement) return;
    parentElement.addEventListener('scroll', handleScroll);
    return () => parentElement.removeEventListener('scroll', handleScroll);
  }, [parentElement, handleScroll]);

  return {
    isAtEnd,
  };
};

export default useScrollToEnd;
