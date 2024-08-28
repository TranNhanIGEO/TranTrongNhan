import { ReactNode } from "react";

export interface MenuItemProps {
  href: string;
  icon: ReactNode;
  text: string;
  hasArrow?: boolean;
}

export interface MenuItemListProps {
  links: MenuItemProps[];
}

export interface MenuGroupProps {
  title: string;
  links: MenuItemProps[];
}

export interface MenuGroupListProps {
  groups: MenuGroupProps[];
}

export interface SidebarProps {
  onToggleSidebar: () => void;
}