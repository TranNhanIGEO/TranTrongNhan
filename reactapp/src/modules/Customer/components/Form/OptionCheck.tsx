import "./OptionCheck.scss";
import { FC } from 'react';
import { Form, FormCheckProps } from 'react-bootstrap';
import { MdClear } from 'react-icons/md';

const OptionCheck: FC<FormCheckProps> = ({ id, value, label, checked, onChange }) => {
  return (
    <Form.Check id={id} className='option-check p-0 rounded-3'>
      <Form.Check.Input type="checkbox" className="d-none" value={value} checked={checked} onChange={onChange} />
      <Form.Check.Label className='btn text-nowrap fs-7 ff-montserrat w-100 cursor-pointer'>
        {label}
        {checked && <MdClear size={16} />}
      </Form.Check.Label>
    </Form.Check>
  );
};

export default OptionCheck;
