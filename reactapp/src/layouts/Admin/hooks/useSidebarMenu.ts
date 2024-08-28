import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSidebarMenu = () => {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  const handleArrowLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return {
    activeLink,
    handleLinkClick,
    handleArrowLinkClick,
  };
};

export default useSidebarMenu;
