import { FC, useMemo } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';

import AppToast from './Toast';
import useWindowSize from 'hooks/common/useWindowSize';
import { useToastState } from 'components/UI/hooks/useToast';

const AppToastContainer: FC = () => {
  const { toasts } = useToastState();
  const { width } = useWindowSize();

  const position: ToastPosition = useMemo(() => {
    return width > 1200 ? "top-end" : "top-center"
  }, [width])

  return (
    <ToastContainer position={position} className='p-5'>
      {toasts?.map(toast => (
        <AppToast key={toast.id} toast={toast} />
      ))}
    </ToastContainer>
  );
};

export default AppToastContainer;
