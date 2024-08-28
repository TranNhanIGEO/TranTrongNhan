import { FC, Fragment } from 'react';
import MenuTitle from './MenuTitle';
import MenuItemList from './MenuItemList';
import { MenuGroupProps } from 'layouts/Admin/types/sidebarTypes';

const MenuGroup: FC<MenuGroupProps> = ({ title, links }) => {
  return (
    <Fragment>
      <MenuTitle title={title} />
      <MenuItemList links={links} />
    </Fragment>
  );
};

export default MenuGroup;
