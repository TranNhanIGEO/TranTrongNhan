import { ReactNode } from "react";

export interface HeaderProps {
  onToggleSidebar: () => void;
}

export interface DropdownItemProps {
  text: string;
  to: string;
  icon: ReactNode;
}

export interface DropdownItemListProps {
  items: DropdownItemProps[];
}