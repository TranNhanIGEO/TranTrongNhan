import { FC, Fragment } from 'react';
import { Link, Params, useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MdOutlineLocalShipping } from "react-icons/md";
import { Navbar } from 'layouts/Admin/components';
import useGetOrderById from 'hooks/orderCRUD/useGetOrderById';
import NumberHelper from 'helpers/numberHelper';
import DateHelper from 'helpers/dateHelper';

const EditOrder: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { record } = useGetOrderById(id);

  return (
    <Fragment>
      <Navbar title="Order Detail" />
      <Row>
        <Col lg={8} xs={12}>
          <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white pb-0">
              <Card.Title className="fw-bolder">Customer infos</Card.Title>
            </Card.Header>
            <Card.Body className="overflow-hidden py-3">
              <ul>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Receiver: </span>
                  <span className='fw-semibold text-truncate'>{record.receiverName}</span>
                </li>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Address: </span>
                  <span className='fw-semibold text-truncate'>{record.receiverAddress}</span>
                </li>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Phone: </span>
                  <span className='fw-semibold text-truncate'>{record.phoneNumber}</span>
                </li>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Note: </span>
                  <span className='fw-semibold text-truncate'>{record.note}</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} xs={12}>
          <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white pb-0">
              <Card.Title className="fw-bolder">Order summary</Card.Title>
            </Card.Header>
            <Card.Body className="overflow-hidden py-3">
              <ul>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>OrderID: </span>
                  <span className='fw-semibold text-truncate'>{record.id}</span>
                </li>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Date: </span>
                  <span className='fw-semibold text-truncate'>{DateHelper.toDateString(record.orderAt)}</span>
                </li>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Quantity: </span>
                  <span className='fw-semibold text-truncate text-danger-emphasis'>{record.quantity}</span>
                </li>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Total: </span>
                  <span className='fw-semibold text-truncate text-danger'>{NumberHelper.toDecimalString(record.totalAmount)}</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={8} xs={12}>
          <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white pb-0">
              <Card.Title className="fw-bolder">All items</Card.Title>
            </Card.Header>
            <Card.Body className="overflow-hidden py-3">
              <ul className="overflow-x-auto">
                {record.orderDetails?.map(item => (
                  <li key={item.productId} className="d-flex align-items-center py-3 fs-7">
                    <img width={60} src={`${process.env.REACT_APP_SERVER_DOMAIN}/${item.productImage}`} alt={item.productName} />
                    <div className="d-flex justify-content-between flex-grow-1 gap-6">
                      <div className="ms-2 w-100 text-start" style={{ minWidth: 150 }}>
                        <div className="fw-normal">Product name</div>
                        <div className="fw-semibold text-truncate">{item.productName}</div>
                      </div>
                      <div className="ms-2 w-100 text-center" style={{ minWidth: 150 }}>
                        <div className="fw-normal">Quantity</div>
                        <div className="fw-semibold text-truncate">{item.quantity}</div>
                      </div>
                      <div className="ms-2 w-100 text-end" style={{ minWidth: 150 }}>
                        <div className="fw-normal">Price</div>
                        <div className="fw-semibold text-truncate">{NumberHelper.toDecimalString(item.totalPrice)}</div>
                      </div>
                    </div>
                  </li>
                ))}
                <hr className="opacity-50" />
                <div className="d-flex justify-content-between align-items-center py-3 fs-7">
                  <div><RiMoneyDollarCircleFill size={28} className="mx-5" /></div>
                  <div className="d-flex justify-content-between flex-grow-1 gap-6">
                    <div className="ms-2 w-100 text-start" style={{ minWidth: 150 }}>
                      <div className="fw-semibold">Total</div>
                    </div>
                    <div className="ms-2 w-100 text-center" style={{ minWidth: 150 }}>
                      <div className="fw-semibold text-danger-emphasis">{record.quantity}</div>
                    </div>
                    <div className="ms-2 w-100 text-end" style={{ minWidth: 150 }}>
                      <div className="fw-semibold text-danger">{NumberHelper.toDecimalString(record.totalAmount)}</div>
                    </div>
                  </div>
                </div>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} xs={12}>
          <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white pb-0">
              <Card.Title className="fw-bolder">Order status</Card.Title>
            </Card.Header>
            <Card.Body className="overflow-hidden py-3">
              <ul>
                <li className="d-flex align-items-center py-3 fs-7">
                  <span className='w-25 text-nowrap' style={{ minWidth: 100 }}>Current status: </span>
                  <span className='fw-semibold text-truncate'>{record.orderStatus}</span>
                </li>
                <Link to="#" className="btn btn-outline-primary my-3 py-3 d-flex align-items-center justify-content-center gap-2">
                  <MdOutlineLocalShipping size={28} />
                  <p className="mb-0 fw-semibold">Tracking order</p>
                </Link>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EditOrder;
