import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { AppDispatch } from 'stores/store';
import { ForgotPasswordModel } from 'models/DTOs/authModel';
import { forgotPassword } from 'stores/auth/authThunks';

import { forgotPasswordSchema } from 'validators/authValidator';
import configs from 'configs';
import useFormControl from 'components/Form/hooks/useFormControl';
import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';

const forgotPasswordModel: ForgotPasswordModel = configs.fields.forgotPassword;

const useForgotPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<ForgotPasswordModel>(forgotPasswordModel);
  const { validationErrors, handleValidate } = useValidation<ForgotPasswordModel>(forgotPasswordSchema);

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(forgotPassword({ formData }));
    if (forgotPassword.fulfilled.match(action)) navigate(configs.routes.auth.login);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleForgotPassword,
  };
};

export default useForgotPassword;
