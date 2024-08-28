import { FC } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { DropdownItemProps } from 'layouts/Admin/types/headerTypes';

const DropdownItem: FC<DropdownItemProps> = ({ text, to, icon }) => {
  return (
    <NavDropdown.Item key={text} as={Link} to={to && to} className="d-flex align-items-center gap-2">
      {icon && icon}
      <p className="mb-0 text-muted">{text && text}</p>
    </NavDropdown.Item>
  );
};

export default DropdownItem;
