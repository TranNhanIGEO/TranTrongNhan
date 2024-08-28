import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { promotionSchema } from 'validators/promotionValidator';
import { PromotionFormModel } from 'models/DTOs/promotionModel';
import { AppDispatch } from 'stores/store';
import { editPromotion } from 'stores/promotion/promotionThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useGetPromotionById from './useGetPromotionById';
import useFormControl from 'components/Form/hooks/useFormControl';

const useEditPromotion = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { record } = useGetPromotionById(id);
  const { formData, setFormData, handleChange } = useFormControl<PromotionFormModel>(record);
  const { validationErrors, handleValidate } = useValidation<PromotionFormModel>(promotionSchema);

  const handleEditPromotion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(editPromotion({ id, formData, axiosJWT }));
    if (editPromotion.fulfilled.match(action)) navigate(configs.routes.admin.promotion.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  useEffect(() => {
    setFormData({
      name: record.name ?? '',
      description: record.description ?? '',
      discount: record.discount ?? '',
      discountPercentage: record.discountPercentage ?? '',
      startAt: record.startAt ?? null,
      endAt: record.endAt ?? null,
    });
  }, [record, setFormData]);

  return {
    formData,
    validationErrors,
    handleChange,
    handleEditPromotion,
  };
};

export default useEditPromotion;
