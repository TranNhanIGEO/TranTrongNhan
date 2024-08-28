import { useEffect, useState } from 'react';
import useWindowSize from 'hooks/common/useWindowSize';

export const useSidebarToggle = () => {
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(true);
  const { width } = useWindowSize();

  const handleToggleSidebar = () => {
    setIsShowSidebar(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsShowSidebar(width < 1400);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return {
    isShowSidebar,
    handleToggleSidebar,
  };
};

export default useSidebarToggle;
