import './styles/FormFileInput.scss';
import { FC } from 'react';
import { Form, Image } from 'react-bootstrap';
import { LuUploadCloud } from 'react-icons/lu';
import clsx from 'clsx';
import { FormFileInputProps } from './types/formFileInputType';
import { FILE_FORM } from 'constants/form';

const FormFileInput: FC<FormFileInputProps> = ({ label, error, value, ...props }) => {
  const labelClass = clsx('element-uploadfile', {
    'is-invalid': !!error,
  });
  
  return (
    <Form.Group className="mb-5">
      <Form.Label>{label}</Form.Label>
      <Form.Label className={labelClass}>
        <LuUploadCloud size={32} color="#5d87ff" />
        <Form.Control type={FILE_FORM} datatype={FILE_FORM} isInvalid={!!error} {...props} className="d-none" />
        <h5 className="fw-bolder my-3">Upload file</h5>
        <p className="fw-normal fs-7 text-center">Drop files here or click to browser</p>
        {!!value && <Image src={value as string} thumbnail />}
      </Form.Label>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFileInput;
