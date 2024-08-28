import { MenuItemListProps } from 'layouts/Admin/types/sidebarTypes';
import { FC, Fragment } from 'react';
import MenuItem from './MenuItem';

const MenuItemList: FC<MenuItemListProps> = ({ links }) => {
  return (
    <Fragment>
      {links.map(link => (
        <MenuItem key={link.href} link={link} />
      ))}
    </Fragment>
  );
};

export default MenuItemList;
