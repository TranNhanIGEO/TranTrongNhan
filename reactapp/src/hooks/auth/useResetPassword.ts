import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate, useSearchParams } from 'react-router-dom';

import { AppDispatch } from 'stores/store';
import { ResetPasswordModel } from 'models/DTOs/authModel';
import { resetPassword } from 'stores/auth/authThunks';
import { resetPasswordSchema } from 'validators/authValidator';

import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import useFormControl from 'components/Form/hooks/useFormControl';
import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';

const resetPasswordModel: ResetPasswordModel = configs.fields.resetPassword;

const useResetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<ResetPasswordModel>(resetPasswordModel);
  const { validationErrors, handleValidate } = useValidation<ResetPasswordModel>(resetPasswordSchema);
  const [searchParams] = useSearchParams();

  console.log(validationErrors)

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    const params: Partial<ResetPasswordModel> = StringHelper.toObject(searchParams);
    const newFormData: ResetPasswordModel = { ...formData, ...params };
    e.preventDefault();
    const isValid: boolean = await handleValidate(newFormData);
    if (!isValid) return;
    const action = await dispatch(resetPassword({ formData: newFormData }));
    if (resetPassword.fulfilled.match(action)) navigate(configs.routes.auth.login);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleResetPassword,
  };
};

export default useResetPassword;
