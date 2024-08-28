import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'stores/store';
import { LoginModel } from 'models/DTOs/authModel';
import { loginAccount } from 'stores/auth/authThunks';
import { loginSchema } from 'validators/authValidator';

import configs from 'configs';
import useFormControl from 'components/Form/hooks/useFormControl';
import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';

const loginModel: LoginModel = configs.fields.login;

const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<LoginModel>(loginModel);
  const { validationErrors, handleValidate } = useValidation<LoginModel>(loginSchema);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(loginAccount({ formData }));
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };
  
  return {
    formData,
    validationErrors,
    handleChange,
    handleLogin,
  };
};

export default useLogin;
