import { FC } from 'react';
import { Form, FormProps } from 'react-bootstrap';

const FormUpsert: FC<FormProps> = ({ onSubmit, children, ...props }) => {
  return (
    <Form noValidate validated={false} onSubmit={onSubmit} {...props}>
      {children}
    </Form>
  );
};

export default FormUpsert;
