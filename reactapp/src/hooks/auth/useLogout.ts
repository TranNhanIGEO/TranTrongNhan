import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { LogoutModel } from 'models/DTOs/authModel';
import { logoutAccount } from 'stores/auth/authThunks';
import { AppDispatch } from 'stores/store';
import { authStore } from 'stores/auth/authSlice';

import configs from 'configs';
import { logoutSchema } from 'validators/authValidator';
import useMessage from 'hooks/common/useMessage';
import useValidation from 'hooks/common/useValidation';
import { AuthState } from 'stores/auth/authStateTypes';

const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { showMessage } = useMessage();
  const { user }: AuthState = useSelector(authStore);
  const { handleValidate } = useValidation<LogoutModel>(logoutSchema);

  const handleLogout = async () => {
    const formData = { userId: user.id };
    console.log(formData)
    const isValid: boolean = await handleValidate(formData);
    if (!isValid) return;
    const action = await dispatch(logoutAccount({ formData }));
    if (logoutAccount.fulfilled.match(action)) navigate(configs.routes.auth.login);
    showMessage(action.payload?.isSuccess, action.payload?.message);
  };

  return {
    handleLogout,
  };
};

export default useLogout;
