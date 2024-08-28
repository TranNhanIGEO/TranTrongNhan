import useModal from 'components/UI/hooks/useModal';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import { useDispatch, useSelector } from 'react-redux';
import { categoryStore, clearCategory, getCategory } from 'stores/category/categorySlice';
import { AppDispatch } from 'stores/store';
import useRemoveCategory from 'hooks/categoryCRUD/useRemoveCategory';
import { CategoryState } from 'stores/category/categoryStateTypes';

const useCategoryManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: CategoryState = useSelector(categoryStore);
  const { isOpenModal, openModal, closeModal } = useModal();
  const { handleRemoveCategory } = useRemoveCategory();

  const handleOpenModal = (record: CategoryViewModel) => {
    openModal();
    dispatch(getCategory({ isSuccess: true, message: "", record }));
  };

  const handleDeleteCategory = () => {
    closeModal();
    handleRemoveCategory(record.id);
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearCategory());
  }

  return {
    isOpenModal,
    handleCloseModal,
    handleOpenModal,
    handleDeleteCategory,
  };
};

export default useCategoryManagement;
