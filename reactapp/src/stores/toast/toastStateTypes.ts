import { ToastProps } from "components/UI/types/toastTypes";
import { ADD_TOAST, REMOVE_TOAST } from 'constants/toast';

export interface ToastState {
  toasts: ToastProps[];
}
  
export type ToastActions =
  | { type: typeof ADD_TOAST; payload: ToastProps }
  | { type: typeof REMOVE_TOAST; payload: string };
