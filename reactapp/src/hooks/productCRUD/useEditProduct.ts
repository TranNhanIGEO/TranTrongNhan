import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { productSchema } from 'validators/productValidator';
import { ProductFormModel } from 'models/DTOs/productModel';
import { AppDispatch } from 'stores/store';
import { editProduct } from 'stores/product/productThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useGetProductById from './useGetProductById';
import useFormControl from 'components/Form/hooks/useFormControl';
import NumberHelper from 'helpers/numberHelper';

const useEditProduct = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { record } = useGetProductById(id);
  const { formData, setFormData, handleChange } = useFormControl<ProductFormModel>(record);
  const { validationErrors, handleValidate } = useValidation<ProductFormModel>(productSchema);

  const handleEditProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(editProduct({ id, formData, axiosJWT }));
    if (editProduct.fulfilled.match(action)) navigate(configs.routes.admin.product.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  useEffect(() => {
    setFormData({
      categoryId: record.categoryId ?? '',
      name: record.name ?? '',
      description: record.description ?? '',
      price: NumberHelper.toDecimalString(record.price) ?? '',
      image: record.image ?? '',
      file: undefined
    });
  }, [record, setFormData]);

  return {
    formData,
    validationErrors,
    handleChange,
    handleEditProduct,
  };
};

export default useEditProduct;
