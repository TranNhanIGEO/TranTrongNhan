import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { categorySchema } from 'validators/categoryValidator';
import { CategoryFormModel } from 'models/DTOs/categoryModel';
import { AppDispatch } from 'stores/store';
import { editCategory } from 'stores/category/categoryThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useGetCategoryById from './useGetCategoryById';
import useFormControl from 'components/Form/hooks/useFormControl';

const useEditCategory = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { record } = useGetCategoryById(id);
  const { formData, setFormData, handleChange } = useFormControl<CategoryFormModel>(record);
  const { validationErrors, handleValidate } = useValidation<CategoryFormModel>(categorySchema);

  const handleEditCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(editCategory({ id, formData, axiosJWT }));
    if (editCategory.fulfilled.match(action)) navigate(configs.routes.admin.category.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  useEffect(() => {
    setFormData({
      name: record.name ?? '',
      image: record.image ?? '',
      file: undefined
    });
  }, [record, setFormData]);

  return {
    formData,
    validationErrors,
    handleChange,
    handleEditCategory,
  };
};

export default useEditCategory;
