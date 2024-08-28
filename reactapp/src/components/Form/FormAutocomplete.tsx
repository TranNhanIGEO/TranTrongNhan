import { forwardRef, useMemo } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { FormAutocompleteInputProps } from './types/formAutocomplteInput';
import clsx from 'clsx';

const FormAutocomplete = forwardRef<HTMLUListElement, FormAutocompleteInputProps>(({ 
  label, 
  error, 
  options, 
  isOpenList,
  value,
  onFocus,
  onBlur,
  onOptionClick,
  ...props}, 
  ref
) => {

  const listClass = clsx("position-absolute top-100 w-100", {
    'd-block': isOpenList,
    'd-none': !isOpenList,
  });
  
  const valueText = useMemo(() => {
    return options?.find(option => option.value === value)?.label
  }, [options, value])

  return (
    <Form.Group className="mb-5">
      <Form.Label>{label}</Form.Label>
      <Form.Group className='position-relative'>
        <Form.Control {...props} isInvalid={!!error} onFocus={onFocus} onBlur={onBlur} value={valueText ?? value} />
        <ListGroup ref={ref} as="ul" className={listClass} style={{ height: 200, overflowY: "auto" }}>
          {options?.map(option => (
            <ListGroup.Item key={option.value} as="li" onClick={() => onOptionClick(option.value)}>{option.label}</ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>
      <Form.Control.Feedback type="invalid"> {error}</Form.Control.Feedback>
    </Form.Group>
  );
});

export default FormAutocomplete;
