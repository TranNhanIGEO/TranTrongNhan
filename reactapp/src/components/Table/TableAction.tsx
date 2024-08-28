import { Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';
import { TableActionProps } from './types/tableActionTypes';

const TableAction = ({ searchTerm, onSearchChange, renderHeaderActions }: TableActionProps) => {
  return (
    <Fragment>
      {renderHeaderActions ? renderHeaderActions() : <Button className='no-style' />}
      <Form.Group className="position-relative">
        <Form.Control className="pe-7" placeholder="Search..." value={searchTerm} onChange={onSearchChange} />
        <IoIosSearch className="position-absolute" style={{ top: 15, right: 10 }} />
      </Form.Group>
    </Fragment>
  );
};

export default TableAction;
