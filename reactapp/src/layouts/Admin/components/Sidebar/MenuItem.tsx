import { FC } from 'react';
import clsx from 'clsx';
import { MenuItemProps } from 'layouts/Admin/types/sidebarTypes';
import useSidebarMenu from 'layouts/Admin/hooks/useSidebarMenu';
import { Link } from 'react-router-dom';

const MenuItem: FC<{ link: MenuItemProps }> = ({ link }) => {
  const { activeLink, handleArrowLinkClick, handleLinkClick } = useSidebarMenu();

  const liClass = clsx('sidebar-item', {
    selected: link.href === activeLink,
  });

  const aClass = clsx('sidebar-link', {
    active: link.href === activeLink,
  });

  const onClick = link.hasArrow ? 
    handleArrowLinkClick : 
    () => handleLinkClick(link.href);

  return (
    <li key={link.href} className={liClass}>
      <Link to={link.href} className={aClass} onClick={onClick}>
        <span> {link.icon} </span>
        <span> {link.text} </span>
      </Link>
    </li>
  );
};

export default MenuItem;
