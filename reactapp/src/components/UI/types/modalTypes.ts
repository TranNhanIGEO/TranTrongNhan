import { ReactNode } from "react";
import { CREATE_MODAL, UPDATE_MODAL, DELETE_MODAL, SM_SIZE, XL_SIZE, LG_SIZE } from "constants/modal";

export type ModalTypes = 
  | typeof CREATE_MODAL
  | typeof UPDATE_MODAL
  | typeof DELETE_MODAL;

export type ModalSizes = 
  | typeof SM_SIZE
  | typeof XL_SIZE
  | typeof LG_SIZE
  | typeof undefined

export interface ModalProps {
  type: ModalTypes;
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  children?: ReactNode;
}
