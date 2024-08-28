import { FC } from 'react';
import { Button, Card, FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { CheckoutFormProps } from './types/CheckoutFormProps';
import { orderStore } from 'stores/order/orderSlice';
import { OrderState } from 'stores/order/orderStateTypes';

import FormTextInput from 'components/Form/FormTextInput';
import FormUpsert from 'components/Form/FormUpsert';
import { OrderFormModel } from 'models/DTOs/orderModel';
import FormTextAreaInput from 'components/Form/FormTextAreaInput';
import { Link } from 'react-router-dom';
import configs from 'configs';

const CheckoutForm: FC<CheckoutFormProps> = ({ formData, formValidation, onChange, onSubmit }) => {
  const { isLoading, errors }: OrderState = useSelector(orderStore);

  return (
    <Card className='mb-0 shadow h-100'>
      <Card.Header className='bg-white py-6 border-bottom'>
        <Card.Title className='mb-0 fw-bolder ff-pacifico'>Thông tin nhận hàng</Card.Title>
      </Card.Header>
      <Card.Body>
        <FormUpsert onSubmit={onSubmit}>
          <FormTextInput
            label="Tên người nhận"
            error={errors?.receiverName ?? formValidation?.receiverName}
            name={'receiverName' as keyof OrderFormModel}
            value={formData.receiverName ?? ''}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="Địa chỉ người nhận"
            error={errors?.receiverAddress ?? formValidation?.receiverAddress}
            name={'receiverAddress' as keyof OrderFormModel}
            value={formData.receiverAddress ?? ''}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="Số điện thoại người nhận"
            error={errors?.phoneNumber ?? formValidation?.phoneNumber}
            name={'phoneNumber' as keyof OrderFormModel}
            value={formData.phoneNumber ?? ''}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextAreaInput
            label="Ghi chú"
            error={errors?.note ?? formValidation?.note}
            name={'note' as keyof OrderFormModel}
            value={formData.note ?? ''}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormGroup className="d-flex justify-content-between flex-xl-row flex-column gap-3">
            <Link to={configs.routes.customer.cart} className='btn btn-muted flex-xl-grow-0 flex-grow-1'>Quay lại giỏ hàng</Link>
            <Button variant="primary" className="flex-xl-grow-0 flex-grow-1" type="submit" disabled={isLoading}>
              Đặt hàng
            </Button>
          </FormGroup>
        </FormUpsert>
      </Card.Body>
    </Card>
  );
};

export default CheckoutForm;
