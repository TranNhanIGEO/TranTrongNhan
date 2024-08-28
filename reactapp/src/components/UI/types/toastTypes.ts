import { ReactNode } from 'react';
import { SUCCESS_TOAST, ERROR_TOAST, INFO_TOAST } from 'constants/toast';

type ToastStatuses = 
  | typeof SUCCESS_TOAST 
  | typeof ERROR_TOAST 
  | typeof INFO_TOAST;

export interface ToastProviderProps {
  children: ReactNode;
}

export interface ToastProps {
  id: string;
  type: ToastStatuses;
  title: string;
  message: string;
  onClose: () => void;
}

export interface ToastDisplayProps {
  title: string;
  message: string;
}

export interface ToastStatusDisplayProps extends ToastDisplayProps {
  type: ToastStatuses;
}

export interface ToastFunctions {
  success: (params: ToastDisplayProps) => void;
  error: (params: ToastDisplayProps) => void;
  info: (params: ToastDisplayProps) => void;
}
