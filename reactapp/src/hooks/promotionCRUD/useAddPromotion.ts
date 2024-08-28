import { useDispatch } from 'react-redux';
import { FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { promotionSchema } from 'validators/promotionValidator';
import { PromotionFormModel } from 'models/DTOs/promotionModel';
import { AppDispatch } from 'stores/store';
import { addPromotion } from 'stores/promotion/promotionThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useFormControl from 'components/Form/hooks/useFormControl';

const fields: PromotionFormModel = configs.fields.promotions;

const useAddPromotion = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<PromotionFormModel>(fields);
  const { validationErrors, handleValidate } = useValidation<PromotionFormModel>(promotionSchema);

  const handleAddPromotion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(addPromotion({ formData, axiosJWT }));
    if (addPromotion.fulfilled.match(action)) navigate(configs.routes.admin.promotion.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleAddPromotion,
  };
};

export default useAddPromotion;
