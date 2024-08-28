import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { NavbarTypes } from 'layouts/Admin/types/navbarTypes';
import AppBreadcrumb from 'components/UI/Breadcrumb';

const Navbar: FC<NavbarTypes> = ({ title }) => {
  const { pathname } = useLocation();

  return (
    <div className="d-md-flex justify-content-between align-items-center mb-7">
      <h4 className="fw-semibold">{title}</h4>
      <AppBreadcrumb pathname={pathname} />
    </div>
  );
};

export default Navbar;
