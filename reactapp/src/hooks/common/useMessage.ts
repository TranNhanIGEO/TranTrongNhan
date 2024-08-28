import { ToastFunctions } from 'components/UI/types/toastTypes';
import useToast from 'components/UI/hooks/useToast';

const useMessage = () => {
  const toast: ToastFunctions = useToast();

  const showMessage = (isSuccess?: boolean, message?: string) => {
    if (!message) return;

    switch (isSuccess) {
      case true: toast.success({ title: 'Success', message: message }); break;
      case false: toast.error({ title: 'Failed', message: message }); break;
      default: toast.info({ title: 'Info', message: "Invalid action" }); break;
    }
  }

  return {
    showMessage,
  }
};

export default useMessage;
