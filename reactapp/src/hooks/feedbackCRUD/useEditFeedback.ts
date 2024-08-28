import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { feedbackSchema } from 'validators/feedbackValidator';
import { FeedbackFormModel } from 'models/DTOs/feedbackModel';
import { AppDispatch } from 'stores/store';
import { editFeedback } from 'stores/feedback/feedbackThunks';
import configs from 'configs';

import useValidation from 'hooks/common/useValidation';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';
import useMessage from 'hooks/common/useMessage';
import useGetFeedbackById from './useGetFeedbackById';
import useFormControl from 'components/Form/hooks/useFormControl';

const useEditFeedback = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const { showMessage } = useMessage();
  const { record } = useGetFeedbackById(id);
  const { formData, setFormData, handleChange } = useFormControl<FeedbackFormModel>(record);
  const { validationErrors, handleValidate } = useValidation<FeedbackFormModel>(feedbackSchema);

  const handleEditFeedback = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(editFeedback({ id, formData, axiosJWT }));
    if (editFeedback.fulfilled.match(action)) navigate(configs.routes.admin.feedback.root);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  useEffect(() => {
    setFormData({
      userId: record.userId ?? '',
      productId: record.productId ?? '',
      vote: record.vote ?? 5,
      fullName: record.fullName ?? '',
      email: record.email ?? '',
      comment: record.comment ?? '',
      image: record.image ?? '',
      file: undefined
    });
  }, [record, setFormData]);

  return {
    formData,
    validationErrors,
    handleChange,
    handleEditFeedback,
  };
};

export default useEditFeedback;
