import { Action, Dispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ToastFunctions } from 'components/UI/types/toastTypes';
import { QueryModel } from 'models/Query/queryModel';
import { NavigateFunction } from 'react-router-dom';

export interface QueryDataParam<T> {
  queryData: QueryModel<T>;
}

export interface FormDataParam<T> {
  formData: T;
}

export interface IdentifierParam {
  id?: string;
}

export interface DispatchParam<T extends Action<string>> {
  dispatch: Dispatch<T>;
}

export interface NavigateParam {
  navigate: NavigateFunction;
}

export interface AxiosParam {
  axiosJWT: AxiosInstance;
}

export interface ToastParam {
  toast: ToastFunctions;
}
