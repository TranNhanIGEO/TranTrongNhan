import { ChangeEvent, ReactNode } from "react";

export interface TableActionProps {
  searchTerm?: string;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  renderHeaderActions?: () => ReactNode;
}
