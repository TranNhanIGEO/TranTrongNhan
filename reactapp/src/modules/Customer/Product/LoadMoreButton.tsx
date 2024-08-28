import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdArrowDropdown } from 'react-icons/io';

interface LoadMoreButtonProps {
    remainingQuantity: number;
    isLoading: boolean;
    onClick: () => void;
  }
  
const LoadMoreButton: FC<LoadMoreButtonProps> = ({ remainingQuantity, isLoading, onClick }) => (
  <div className='d-flex justify-content-center mb-6'>
    <Button variant='outline-brown px-6' onClick={onClick} disabled={isLoading}>
      <span>Xem thêm {remainingQuantity} sản phẩm</span>
      <IoMdArrowDropdown />
    </Button>
  </div>
);

export default LoadMoreButton;
