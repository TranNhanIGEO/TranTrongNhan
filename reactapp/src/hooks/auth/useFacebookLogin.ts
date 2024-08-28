import { useLogin } from 'react-facebook';
import { useDispatch } from 'react-redux';

import { facebookLogin } from 'stores/auth/authThunks';
import { AppDispatch } from 'stores/store';
import useMessage from 'hooks/common/useMessage';

const useFacebookLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showMessage } = useMessage();
  const { login, status, isLoading, error } = useLogin();

  const handleFacebookLogin = async () => {
    try {
      const response = await login({ scope: 'email' });
      const token: string = response.authResponse.accessToken;
      dispatch(facebookLogin({ formData: { token } }));
    } catch (error: any) {
      showMessage(false, error.message);
    }
  };

  return {
    isLoading,
    status,
    error,
    handleFacebookLogin,
  };
};

export default useFacebookLogin;
