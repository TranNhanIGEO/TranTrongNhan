import { ReactNode } from 'react';

export interface OffcanvasProps {
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  children?: ReactNode;
}
