import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom';

import { AppDispatch } from 'stores/store';
import { ProfileFormModel } from 'models/DTOs/userModel';
import { changeProfile } from 'stores/auth/authThunks';
import { changeProfileSchema } from 'validators/userValidator';
import { authStore } from 'stores/auth/authSlice';
import { AuthState } from 'stores/auth/authStateTypes';

import configs from 'configs';
import useFormControl from 'components/Form/hooks/useFormControl';
import useValidation from 'hooks/common/useValidation';
import useMessage from 'hooks/common/useMessage';
import useAxiosJWT from './useAxiosJWT';

const profileModel: ProfileFormModel = configs.fields.profile;

const useChangeProfile = () => {
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { user }: AuthState = useSelector(authStore);
  const { formData, setFormData, handleChange } = useFormControl<ProfileFormModel>(profileModel);
  const { validationErrors, handleValidate } = useValidation<ProfileFormModel>(changeProfileSchema);
  const { id }: Readonly<Params<string>> = useParams();

  useEffect(() => {
    setFormData({
      phoneNumber: user.phoneNumber ?? "",
      fullName: user.fullName ?? "",
      homeAddress: user.homeAddress ?? "",
      avatar: user.avatar ?? "",
      file: undefined,
    })
  }, [user, setFormData])

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(changeProfile({ axiosJWT, id, formData }));
    if (changeProfile.fulfilled.match(action)) navigate(configs.routes.auth.login);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    formData,
    validationErrors,
    handleChange,
    handleChangeProfile,
  };
};

export default useChangeProfile;
