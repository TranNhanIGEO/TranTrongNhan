import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import UserTable from './Table';

const UserManager: FC = () => {

  return (
    <Fragment>
      <Navbar title='User management' />
      <UserTable />
    </Fragment>
  );
};

export default UserManager;
