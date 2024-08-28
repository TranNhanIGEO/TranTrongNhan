import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { FormTextAreaInputProps } from './types/formTextAreaInputType';
import { TEXTAREA_FORM } from 'constants/form';

const FormTextAreaInput: FC<FormTextAreaInputProps> = ({ label, error, ...props }) => (
  <Form.Group className='mb-5'>
    <Form.Label>{label}</Form.Label>
    <Form.Control as={TEXTAREA_FORM} datatype={TEXTAREA_FORM} rows={3} {...props} isInvalid={!!error} />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

export default FormTextAreaInput;
