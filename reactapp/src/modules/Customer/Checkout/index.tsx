import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CheckoutForm from './Form';
import useAddOrder from 'hooks/orderCRUD/useAddOrder';
import { useSelector } from 'react-redux';
import { cartStore } from 'stores/cart/cartSlice';
import { CartState } from 'stores/cart/cartStateTypes';
import OrderItems from './OrderItems';

const Checkout: FC = () => {
  const { formData, validationErrors, handleChange, handleAddOrder } = useAddOrder();
  const { records }: CartState = useSelector(cartStore);

  return (
    <Container>
      {!!records.length && (
        <Row className='my-6 gap-lg-0 gap-3'>
          <Col xl={8} lg={6} xs={12} className='order-lg-0 order-1'>
            <CheckoutForm formData={formData} formValidation={validationErrors} onChange={handleChange} onSubmit={handleAddOrder} />
          </Col>
          <Col xl={4} lg={6} xs={12} className='order-lg-1 order-0'>
            <OrderItems items={records} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Checkout;
