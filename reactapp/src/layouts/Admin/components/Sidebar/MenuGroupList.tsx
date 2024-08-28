import { FC, Fragment } from 'react';
import { MenuGroupListProps } from 'layouts/Admin/types/sidebarTypes';
import MenuGroup from './MenuGroup';

const MenuGroupList: FC<MenuGroupListProps> = ({ groups }) => {
  return (
    <Fragment>
      {groups.map(group => (
        <MenuGroup key={group.title} title={group.title} links={group.links} />
      ))}
    </Fragment>
  );
};

export default MenuGroupList;
