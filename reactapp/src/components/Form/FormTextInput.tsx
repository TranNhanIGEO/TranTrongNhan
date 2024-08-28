import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { FormTextInputProps } from './types/formTextInputType';
import { NUMBER_FORM, TEXT_FORM } from 'constants/form';

const FormTextInput: FC<FormTextInputProps> = ({ label, type, error, ...props }) => (
  <Form.Group className='mb-5'>
    {!!label && <Form.Label>{label}</Form.Label>}
    <Form.Control datatype={type} type={type !== NUMBER_FORM ? type : TEXT_FORM} {...props} isInvalid={!!error} />
    <Form.Control.Feedback type="invalid"> {error}</Form.Control.Feedback>
  </Form.Group>
);

export default FormTextInput;
