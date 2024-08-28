import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { FormSelectInputProps } from './types/formSelectInputType';

const FormSelectInput: FC<FormSelectInputProps> = (({ label, options, error, ...props }) => (
  <Form.Group className='mb-5'>
    <Form.Label>{label}</Form.Label>
    <Form.Select {...props} isInvalid={!!error}>
      <option value="">Select a {label}</option>
      {options?.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
    <Form.Control.Feedback type="invalid">
      {error}
    </Form.Control.Feedback>
  </Form.Group>
));

export default FormSelectInput;
