import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { ExternalLoginProps } from 'modules/Auth/types/authProps';

const ExternalLogin: FC<ExternalLoginProps> = ({ icon, text, ...props }) => {
  return (
    <Button variant="" className="d-flex border border-1 border-muted border-opacity-50 align-items-center justify-content-center rounded-3 w-50" {...props}>
      {icon}
      <span className="ms-2">{text}</span>
    </Button>
  );
};

export default ExternalLogin;
