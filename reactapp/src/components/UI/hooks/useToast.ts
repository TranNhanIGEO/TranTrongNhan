import { Dispatch, useContext } from 'react';
import { ToastDispatchContext, ToastStateContext } from 'contexts/Toast';
import { ToastStatusDisplayProps, ToastFunctions, ToastProps, ToastDisplayProps } from 'components/UI/types/toastTypes';
import { setAddToast, setRemoveToast } from 'stores/toast/toastSlice';
import { ToastActions, ToastState } from 'stores/toast/toastStateTypes';
import { SUCCESS_TOAST, ERROR_TOAST, INFO_TOAST } from 'constants/toast';

export const useToastState = (): ToastState => {
  const context = useContext(ToastStateContext);

  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }

  return context;
};

export const useToastDispatch = (): Dispatch<ToastActions> => {
  const context = useContext(ToastDispatchContext);

  if (context === undefined) {
    throw new Error('useToastDispatch must be used within a ToastProvider');
  }

  return context;
};

const useToast = (autoClose: boolean = true, delayClose: number = 3000): ToastFunctions => {
  const dispatch = useToastDispatch();

  const showToast = ({ type, title, message }: ToastStatusDisplayProps) => {
    const toastID: string = Math.random().toString().substring(2);

    const handleClose = (): void => {
      dispatch(setRemoveToast(toastID));
    };

    const newToast: ToastProps = {
      id: toastID,
      type,
      title,
      message,
      onClose: handleClose,
    };

    dispatch(setAddToast(newToast));

    if (autoClose) {
      setTimeout(handleClose, delayClose);
    }
  };

  return {
    success: (props: ToastDisplayProps) => showToast({ ...props, type: SUCCESS_TOAST }),
    error: (props: ToastDisplayProps) => showToast({ ...props, type: ERROR_TOAST }),
    info: (props: ToastDisplayProps) => showToast({ ...props, type: INFO_TOAST }),
  };
};

export default useToast;
