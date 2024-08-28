import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { AppDispatch } from 'stores/store';
import { RegisterModel } from 'models/DTOs/authModel';
import { registerAccount } from 'stores/auth/authThunks';

import { registerSchema } from 'validators/authValidator';
import configs from 'configs';
import useFormControl from 'components/Form/hooks/useFormControl';
import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';

const registerModel: RegisterModel = configs.fields.register;

const useRegister = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<RegisterModel>(registerModel);
  const { validationErrors, handleValidate } = useValidation<RegisterModel>(registerSchema);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(registerAccount({ formData }));
    if (registerAccount.fulfilled.match(action)) navigate(configs.routes.auth.login);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleRegister,
  };
};

export default useRegister;
