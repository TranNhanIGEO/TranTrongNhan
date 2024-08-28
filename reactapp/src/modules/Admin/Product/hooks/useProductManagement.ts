import useModal from 'components/UI/hooks/useModal';
import { ProductViewModel } from 'models/DTOs/productModel';
import { useDispatch, useSelector } from 'react-redux';
import { productStore, clearProduct, getProduct } from 'stores/product/productSlice';
import { AppDispatch } from 'stores/store';
import useRemoveProduct from 'hooks/productCRUD/useRemoveProduct';
import { ProductState } from 'stores/product/productStateTypes';

const useProductManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: ProductState = useSelector(productStore);
  const { isOpenModal, openModal, closeModal } = useModal();
  const { handleRemoveProduct } = useRemoveProduct();

  const handleOpenModal = (record: ProductViewModel) => {
    openModal();
    dispatch(getProduct({ isSuccess: true, message: "", record }));
  };

  const handleDeleteProduct = () => {
    closeModal();
    handleRemoveProduct(record.id);
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearProduct());
  }

  return {
    isOpenModal,
    handleCloseModal,
    handleOpenModal,
    handleDeleteProduct,
  };
};

export default useProductManagement;
