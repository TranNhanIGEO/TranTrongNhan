import { useGoogleLogin as useLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import { googleLogin } from 'stores/auth/authThunks';
import { AppDispatch } from 'stores/store';
import useMessage from 'hooks/common/useMessage';

const useGoogleLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showMessage } = useMessage();

  const onLoginSuccess = (token: string) => {
    dispatch(googleLogin({ formData: { token } }));
  };

  const onLoginError = (description?: string) => {
    showMessage(false, description);
  };

  const login = useLogin({
    onSuccess: tokenResponse => onLoginSuccess(tokenResponse.access_token),
    onError: errorResponse => onLoginError(errorResponse.error_description),
  });

  return {
    handleGoogleLogin: () => login(),
  };
};

export default useGoogleLogin;
