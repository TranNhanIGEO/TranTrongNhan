import { useDispatch } from 'react-redux';
import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { categorySchema } from 'validators/categoryValidator';
import { CategoryFormModel } from 'models/DTOs/categoryModel';
import { AppDispatch } from 'stores/store';
import { addCategory } from 'stores/category/categoryThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useFormControl from 'components/Form/hooks/useFormControl';

const fields: CategoryFormModel = configs.fields.categories;

const useAddCategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<CategoryFormModel>(fields);
  const { validationErrors, handleValidate } = useValidation<CategoryFormModel>(categorySchema);

  const handleAddCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(addCategory({ formData, axiosJWT }));
    if (addCategory.fulfilled.match(action)) navigate(configs.routes.admin.category.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleAddCategory,
  };
};

export default useAddCategory;
