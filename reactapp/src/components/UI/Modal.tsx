import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalProps, ModalSizes } from 'components/UI/types/modalTypes';
import { CREATE_MODAL, UPDATE_MODAL, DELETE_MODAL } from 'constants/modal';

const modalTypes = {
  [CREATE_MODAL]: {
    modalSize: 'xl',
    submitColor: 'primary',
    submitTitle: 'Save changes',
    horizontalAlign: 'justify-content-end',
  },
  [UPDATE_MODAL]: {
    modalSize: 'xl',
    submitColor: 'warning',
    submitTitle: 'Save changes',
    horizontalAlign: 'justify-content-end',
  },
  [DELETE_MODAL]: {
    modalSize: undefined,
    submitColor: 'danger',
    submitTitle: 'Delete',
    horizontalAlign: 'justify-content-center',
  },
};

const AppModal: FC<ModalProps> = ({ title, type, isOpen, onClose, onSubmit, children }) => {
  const { 
    modalSize, 
    submitColor, 
    submitTitle, 
    horizontalAlign 
  } = modalTypes[type];

  return (
    <Modal size={modalSize as ModalSizes} centered={true} show={isOpen} onHide={onClose}>
      <Modal.Header closeButton={false} className="py-5">
        <Modal.Title as="h2" className='mx-auto'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className={horizontalAlign + " py-5"}>
        <Button variant="outline-dark" size="lg" className="px-lg-5 rounded-0" onClick={onClose}>
          Close
        </Button>
        <Button variant={submitColor} size="lg" className="px-lg-5 rounded-0" onClick={onSubmit}>
          {submitTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModal;
