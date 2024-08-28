import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { AuthState } from 'stores/auth/authStateTypes';
import { authStore } from 'stores/auth/authSlice';
import { feedbackSchema } from 'validators/feedbackValidator';
import { FeedbackFormModel } from 'models/DTOs/feedbackModel';
import { AppDispatch } from 'stores/store';
import { addFeedback } from 'stores/feedback/feedbackThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useFormControl from 'components/Form/hooks/useFormControl';

const fields: FeedbackFormModel = configs.fields.feedbacks;

const useAddFeedback = (productId: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { formData, setFormData, handleChange } = useFormControl<FeedbackFormModel>(fields);
  const { validationErrors, handleValidate } = useValidation<FeedbackFormModel>(feedbackSchema);
  const { user }: AuthState = useSelector(authStore);

  useEffect(() => {
    setFormData(prev => ({
      ...prev, 
      fullName: user.fullName ?? "",
      email: user.email ?? "",
    }))
  }, [user, setFormData])

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, vote: rating }));
  };

  const handleAddFeedback = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = { 
      ...formData, 
      productId: productId,
      userId: user.id
    }
    const isValid: boolean = await handleValidate(newFormData);
    if (!isValid) return;
    const action = await dispatch(addFeedback({ formData: newFormData, axiosJWT }));
    if (addFeedback.fulfilled.match(action)) navigate(configs.routes.customer.product.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleRatingChange,
    handleAddFeedback,
  };
};

export default useAddFeedback;
