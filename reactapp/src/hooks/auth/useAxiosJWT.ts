import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from "axios";
import { useNavigate, NavigateFunction } from "react-router";

import { axiosAPI as axiosJWT } from "utilities/axiosAPI";
import { refreshAccount } from "stores/auth/authThunks";
import { AppDispatch } from "stores/store";
import { authStore } from "stores/auth/authSlice";
import { AuthState } from "stores/auth/authStateTypes";

const useAxiosJWT = (): AxiosInstance => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { token }: AuthState = useSelector(authStore);

  useEffect(() => {
    const onSuccessRequest = (config: any) => {
      const authToken = config.headers.authorization;
      if (!authToken) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    };
    const onErrorRequest = (error: any): Promise<void> => {
      return Promise.reject(error);
    };

    const onSuccessResponse = (response: any) => {
      return response;
    };
    const onErrorResponse = (error: any): Promise<void> => {
      const prevReq = error.config;
      if (error.response?.status === 401 && !prevReq.__isRetryRequest) {
        prevReq.__isRetryRequest = true;
        dispatch(refreshAccount({})).then(action => {
          if (!refreshAccount.fulfilled.match(action)) return;
          const { token } = action.payload;
          prevReq.headers["Authorization"] = `Bearer ${token}`;
        });
        return axiosJWT(prevReq);
      }
      return Promise.reject(error);
    };

    const requestInterceptor = axiosJWT.interceptors.request.use(
      onSuccessRequest,
      onErrorRequest
    );
    const responseInterceptor = axiosJWT.interceptors.response.use(
      onSuccessResponse,
      onErrorResponse
    );

    return () => {
      axiosJWT.interceptors.request.eject(requestInterceptor);
      axiosJWT.interceptors.response.eject(responseInterceptor);
    };
  }, [token, dispatch, navigate]);

  return axiosJWT;
};

export default useAxiosJWT;
