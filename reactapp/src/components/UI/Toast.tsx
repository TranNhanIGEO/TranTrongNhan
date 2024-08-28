import { FC } from 'react';
import { Toast } from 'react-bootstrap';
import { ToastProps } from 'components/UI/types/toastTypes';
import { ERROR_TOAST, INFO_TOAST, SUCCESS_TOAST } from 'constants/toast';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
import { MdInfo } from 'react-icons/md';

const toastIcons = {
  [SUCCESS_TOAST]: <FaCheckCircle size={20} fill="#16D583" />,
  [ERROR_TOAST]: <IoIosWarning size={20} fill="#EA5656" />,
  [INFO_TOAST]: <MdInfo size={20} fill="#2C7BE5" />,
};

const AppToast: FC<{ toast: ToastProps }> = ({ toast }) => {
  return (
    <Toast key={toast.id} onClose={toast.onClose}>
      <Toast.Header className="d-flex align-items-center" closeButton={true}>
        {toastIcons[toast.type]}
        <strong className="me-auto ms-2">{toast.title}</strong>
      </Toast.Header>
      <Toast.Body>{toast.message}</Toast.Body>
    </Toast>
  );
};

export default AppToast;
