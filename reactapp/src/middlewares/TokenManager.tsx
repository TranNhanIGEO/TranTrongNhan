import { FC, Fragment, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'stores/store';
import { refreshAccount } from 'stores/auth/authThunks';
import { AuthState } from 'stores/auth/authStateTypes';
import { authStore } from 'stores/auth/authSlice';
import CookieHelper from 'helpers/cookieHelper';

const TokenManager: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user }: AuthState = useSelector(authStore);
  const uid = CookieHelper.getCookie("uid");

  useEffect(() => {
    if (uid && !user.id) {
      dispatch(refreshAccount({}))
    }
  }, [uid, user.id, dispatch]);

  return <Fragment>{children}</Fragment>;
};

export default TokenManager;
