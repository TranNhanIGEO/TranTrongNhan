import { useDispatch } from 'react-redux';
import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { productSchema } from 'validators/productValidator';
import { ProductFormModel } from 'models/DTOs/productModel';
import { AppDispatch } from 'stores/store';
import { addProduct } from 'stores/product/productThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useFormControl from 'components/Form/hooks/useFormControl';

const fields: ProductFormModel = configs.fields.products;

const useAddProduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<ProductFormModel>(fields);
  const { validationErrors, handleValidate } = useValidation<ProductFormModel>(productSchema);

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(addProduct({ formData, axiosJWT }));
    if (addProduct.fulfilled.match(action)) navigate(configs.routes.admin.product.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleAddProduct,
  };
};

export default useAddProduct;
