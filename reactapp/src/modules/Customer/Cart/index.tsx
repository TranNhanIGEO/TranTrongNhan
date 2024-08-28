import { FC, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TableColumnProps } from 'components/Table/types/tableDataTypes';
import { CartItemViewModel } from 'models/DTOs/cartItemModel';
import { QueryModel } from 'models/Query/queryModel';
import { CartQueryModel } from 'models/Query/cartQueryModel';
import { shoppingSessionStore } from 'stores/shoppingSession/shoppingSessionSlice';
import { ShoppingSessionState } from 'stores/shoppingSession/shoppingSessionStateTypes';

import NumberHelper from 'helpers/numberHelper';
import configs from 'configs';
import TableData from 'components/Table/TableData';
import AdjustQuantity from 'components/UI/AdjustQuantity';

import useUpdateCart from 'hooks/cartCRUD/useUpdateCart';
import useGetCartsBySessionId from 'hooks/cartCRUD/useGetCartsBySessionId';

const Cart: FC = () => {
  const { handleCartClick, handleCartChange } = useUpdateCart();
  const { record: session }: ShoppingSessionState = useSelector(shoppingSessionStore);

  const queryModel: QueryModel<CartItemViewModel> & CartQueryModel = useMemo(() => {
    return {
      ...configs.query.cartItems,
      sessionId: session.id,
    };
  }, [session.id]);

  const { records } = useGetCartsBySessionId(queryModel);

  const renderPrice = (value: string | undefined) => {
    return (
      <p>{NumberHelper.toDecimalString(value)}</p>
    );
  };

  const renderImageColumn = ({ productId, productName, productImage}: CartItemViewModel) => {
    return (
      <Link to={`${configs.routes.customer.product.root}/${productId}`} className="d-block gap-3">
        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/${productImage}`} width={100} className="rounded-3" alt="" />
        <span className="ms-2 fw-bold text-nowrap">{productName}</span>
      </Link>
    );
  };

  const renderQuantityColumn = ({ productId, quantity }: CartItemViewModel) => {
    return (
      <AdjustQuantity
        id={productId}
        quantity={quantity}
        onQuantityChange={handleCartChange}
        onIncreaseQuantity={() => handleCartClick(quantity + 1, productId)}
        onDecreaseQuantity={() => handleCartClick(quantity - 1, productId)}
      />
    );
  };

  const columns: TableColumnProps<CartItemViewModel>[] = [
    { key: 'id', label: 'ID', viewing: false },
    { key: 'productImage', label: 'Sản phẩm', viewing: true, sorting: false, renderRow: renderImageColumn },
    { key: 'productPrice', label: 'Đơn giá', viewing: true, sorting: false, renderRow: ({ productPrice }: CartItemViewModel) => renderPrice(productPrice) },
    { key: 'quantity', label: 'Số lượng', viewing: true, sorting: false, renderRow: renderQuantityColumn },
    { key: 'totalAmount', label: 'Thành tiền', viewing: true, sorting: false, renderRow: ({ totalAmount }: CartItemViewModel) => renderPrice(totalAmount) },
  ];

  const totalUnitPrice: string = useMemo(() => {
    return NumberHelper.toDecimalString(session.totalUnitPrice);
  }, [session]);

  const totalDiscount: string = useMemo(() => {
    return NumberHelper.toDecimalString(session.totalDiscount);
  }, [session]);

  const totalPrice: string = useMemo(() => {
    return NumberHelper.toDecimalString(session.totalPrice);
  }, [session]);

  return (
    <Container>
      <div className="mt-6">
        <h3 className="text-center ff-pacifico">Giỏ hàng của bạn</h3>
      </div>
      <div className="border border-2 rounded-1 my-6">
        <TableData rows={records} columns={columns} />
      </div>
      <Row className="mb-6">
        <Col md={8} xs={12} className="d-flex align-self-end order-md-0 order-1">
          <Link className="btn btn-muted flex-md-grow-0 flex-grow-1 mt-md-0 mt-3" to={configs.routes.customer.product.root}>
            Tiếp tục mua hàng
          </Link>
        </Col>
        {!!records.length && (
          <Col md={4} xs={12}>
            <div className="d-flex justify-content-between mb-3 order-md-1 order-0">
              <span className='fw-bold'>Đơn giá:</span>
              <span className='text-danger fw-bolder'>{totalUnitPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className='fw-bold'>Giảm giá:</span>
              <span className='text-danger fw-bolder'>{totalDiscount}</span>
            </div>
            <hr className='opacity-25' />
            <div className="d-flex justify-content-between my-3">
              <span className='fw-bold'>Tổng tiền:</span>
              <span className='text-danger fw-bolder'>{totalPrice}</span>
            </div>
            <Link className="btn btn-brown w-100" to={configs.routes.customer.checkout}>
              Thanh toán
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
