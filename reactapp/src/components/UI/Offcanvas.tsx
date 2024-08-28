import { FC } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { OffcanvasProps } from './types/offcanvasTypes';

const AppOffcanvas: FC<OffcanvasProps> = ({ isOpen, onClose, title, children, ...props }) => {
  return (
    <Offcanvas show={isOpen} onHide={onClose} {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title as="h2">{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppOffcanvas;
