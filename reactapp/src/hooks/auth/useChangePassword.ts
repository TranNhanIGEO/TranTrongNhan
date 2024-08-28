import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosInstance } from 'axios';
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom';

import { AppDispatch } from 'stores/store';
import { ChangePasswordModel } from 'models/DTOs/userModel';
import { changePassword } from 'stores/auth/authThunks';
import { changePasswordSchema } from 'validators/userValidator';

import configs from 'configs';
import useFormControl from 'components/Form/hooks/useFormControl';
import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';
import useAxiosJWT from './useAxiosJWT';

const changePasswordModel: ChangePasswordModel = configs.fields.changePassword;

const useChangePassword = () => {
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { formData, handleChange } = useFormControl<ChangePasswordModel>(changePasswordModel);
  const { validationErrors, handleValidate } = useValidation<ChangePasswordModel>(changePasswordSchema);
  const { id }: Readonly<Params<string>> = useParams();

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(changePassword({ axiosJWT, id, formData }));
    if (changePassword.fulfilled.match(action)) navigate(configs.routes.auth.login);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleChangePassword,
  };
};

export default useChangePassword;
