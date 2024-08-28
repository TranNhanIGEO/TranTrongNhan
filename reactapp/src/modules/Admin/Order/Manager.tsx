import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import OrderTable from './Table';

const OrderManager: FC = () => {

  return (
    <Fragment>
      <Navbar title='Order management' />
      <OrderTable />
    </Fragment>
  );
};

export default OrderManager;
