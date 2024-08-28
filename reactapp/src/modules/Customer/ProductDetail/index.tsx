import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, FormGroup, Row } from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import { FeedbackFormModel } from 'models/DTOs/feedbackModel';
import { feedbackStore } from 'stores/feedback/feedbackSlice';
import { FeedbackState } from 'stores/feedback/feedbackStateTypes';

import AdjustQuantity from 'components/UI/AdjustQuantity';
import NumberHelper from 'helpers/numberHelper';
import FormUpsert from 'components/Form/FormUpsert';
import Evaluation from '../components/Evaluation/Evaluation';
import FormTextAreaInput from 'components/Form/FormTextAreaInput';

import useAddFeedback from 'hooks/feedbackCRUD/useAddFeedback';
import useUpdateCart from 'hooks/cartCRUD/useUpdateCart';
import useGetProductById from 'hooks/productCRUD/useGetProductById';
import FormTextInput from 'components/Form/FormTextInput';
import FormFileInput from 'components/Form/FormFileInput';

const ProductDetail: FC = () => {
  const { id } = useParams();
  const { record } = useGetProductById(id);
  const { errors, isLoading }: FeedbackState = useSelector(feedbackStore);
  
  const { 
    initQuantity,
    updateCartItem, 
    handleCartClick, 
    handleCartChange 
  } = useUpdateCart(false);

  const {
    formData,
    validationErrors,
    handleChange,
    handleRatingChange,
    handleAddFeedback
  } = useAddFeedback(id as string);

  const imageValue = useMemo(() => {
    if (!formData.image) return;
    return formData.file?.size ? URL.createObjectURL(formData.file) : `${process.env.REACT_APP_SERVER_DOMAIN}/${formData.image}`;
  }, [formData.image, formData.file]);

  return (
    <Container>
      <Row className="my-6">
        <Col lg={4} md={6} xs={12}>
          <div className="mb-md-0 mb-6">
            <img width="100%" src={`${process.env.REACT_APP_SERVER_DOMAIN}/${record.image}`} alt={record.name} />
          </div>
        </Col>
        <Col lg={8} md={6} xs={12}>
          <h3 className="fw-semibold mb-3">{record.name}</h3>
          <p className="mb-3">Danh mục: <span className="text-brown">{record.categoryName}</span></p>
          <p className="mb-3">Tình trạng: <span className="text-success">Còn hàng</span></p>
          <p className="mb-3">Đã bán: <span className="text-danger">{record.sold}</span></p>
          <p className="mb-3">Đã xem: <span className="text-brown">{record.viewed}</span></p>
          <hr className="mb-3 opacity-25" />
          <p className="mb-3">{record.description}</p>
          <hr className="mb-3 opacity-25" />
          <p className="mb-3 text-danger">{NumberHelper.toDecimalString(record.price)}Đ</p>
          <div className="d-flex align-items-center gap-3 mb-3">
            <span>Số lượng</span>
            <AdjustQuantity
              id={record.id}
              quantity={initQuantity}
              onQuantityChange={handleCartChange}
              onIncreaseQuantity={() => handleCartClick(initQuantity + 1)}
              onDecreaseQuantity={() => handleCartClick(initQuantity - 1)}
            />
          </div>
          <div className="d-flex gap-3">
            <Button 
              variant="outline-brown" 
              className="rounded-0 d-flex align-items-center gap-2 flex-md-grow-0 flex-grow-1" 
              onClick={() => updateCartItem(initQuantity, record.id)}
            >
              <BsCartPlus />
              <span>Thêm vào giỏ hàng</span>
            </Button>
            <Button variant="brown" className="rounded-0 flex-md-grow-0 flex-grow-1">
              Mua ngay
            </Button>
          </div>
        </Col>
      </Row>
      <Card className='mb-6'>
        <Card.Body className='border border-2 border-brown border-opacity-25'>
          <FormUpsert onSubmit={handleAddFeedback}>
            <div className='text-center'>
              <h3 className='fw-semibold mb-5'>Nhận xét về "{record.name}"</h3>
            </div>
            <FormGroup className='mb-5'>
              <p className='mb-3 fw-semibold'>Đánh giá của bạn</p>
              <Evaluation rating={formData.vote} onRatingChange={handleRatingChange} className="justify-content-end" />
            </FormGroup>
            <FormTextAreaInput
              label="Nhận xét của bạn"
              error={errors?.comment ?? validationErrors?.comment}
              name={'comment' as keyof FeedbackFormModel}
              value={formData.comment ?? ""}
              onChange={handleChange}
            />
            <Row>
              <Col md={6} xs={12}>
                <FormTextInput
                  label="Tên"
                  error={errors?.fullName ?? validationErrors?.fullName}
                  name={'fullName' as keyof FeedbackFormModel}
                  value={formData.fullName ?? ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <FormTextInput
                  label="Email"
                  error={errors?.email ?? validationErrors?.email}
                  name={'email' as keyof FeedbackFormModel}
                  value={formData.email ?? ""}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <FormFileInput
              label="Ảnh sản phẩm"
              error={errors?.image ?? validationErrors?.image}
              name={'image' as keyof FeedbackFormModel}
              value={imageValue ?? ""}
              onChange={handleChange}
            />
            <FormGroup className='d-flex'>
              <Button variant="primary" className='flex-md-grow-0 flex-grow-1 px-lg-5' type="submit" disabled={isLoading}>
                Đánh giá
              </Button>
            </FormGroup>
          </FormUpsert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
