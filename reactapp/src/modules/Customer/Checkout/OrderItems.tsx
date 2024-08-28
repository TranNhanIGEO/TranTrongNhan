import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { OrderItemsProps } from './types/OrderItems';
import { shoppingSessionStore } from 'stores/shoppingSession/shoppingSessionSlice';
import { ShoppingSessionState } from 'stores/shoppingSession/shoppingSessionStateTypes';
import NumberHelper from 'helpers/numberHelper';

const OrderItems: FC<OrderItemsProps> = ({ items }) => {
  const { record }: ShoppingSessionState = useSelector(shoppingSessionStore);

  const totalUnitPrice: string = useMemo(() => {
    return NumberHelper.toDecimalString(record.totalUnitPrice);
  }, [record]);

  const totalDiscount: string = useMemo(() => {
    return NumberHelper.toDecimalString(record.totalDiscount);
  }, [record]);

  const totalPrice: string = useMemo(() => {
    return NumberHelper.toDecimalString(record.totalPrice);
  }, [record]);

  return (
    <div className="shadow rounded-3">
      <div className="p-6 border-bottom border-1">
        <h5 className="mb-0 fw-bolder ff-pacifico">Đơn hàng ({record.quantity} sản phẩm)</h5>
      </div>
      <ul className="p-6 border-bottom border-1">
        {items?.map(item => (
          <li key={item.id} className="d-flex align-items-center py-3 fs-7">
            <img width={36} src={`${process.env.REACT_APP_SERVER_DOMAIN}/${item.productImage}`} alt={item.productName} />
            <span className="ms-2">{item.productName}</span>
            <span className="ms-2 fst-italic text-brown">x{item.quantity}</span>
            <span className="ms-auto">{NumberHelper.toDecimalString(item.productPrice)}</span>
          </li>
        ))}
      </ul>
      <ul className="p-6 border-bottom border-1">
        <li className="d-flex mb-3 justify-content-between">
          <span className='fw-bold'>Tạm tính</span>
          <span className='text-danger fw-bolder'>{totalUnitPrice}</span>
        </li>
        <li className="d-flex justify-content-between">
          <span className='fw-bold'>Giảm giá</span>
          <span className='text-danger fw-bolder'>{totalDiscount}</span>
        </li>
      </ul>
      <ul className="p-6 border-bottom border-1">
        <li className="d-flex justify-content-between">
          <span className='fw-bold'>Tổng cộng</span>
          <span className='text-danger fw-bolder'>{totalPrice}</span>
        </li>
      </ul>
    </div>
  );
};

export default OrderItems;
