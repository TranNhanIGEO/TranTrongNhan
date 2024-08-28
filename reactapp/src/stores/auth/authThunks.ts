import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from 'services/auth/authService';
import {
  ChangeEmailFailed,
  ChangeEmailSuccess,
  ChangePasswordFailed,
  ChangePasswordSuccess,
  ChangeProfileFailed,
  ChangeProfileSuccess,
  ConfirmEmailFailed,
  ConfirmEmailSuccess,
  ForgotPasswordFailed,
  ForgotPasswordSuccess,
  LoginFailed,
  LoginSuccess,
  LogoutFailed,
  LogoutSuccess,
  RefreshFailed,
  RefreshSuccess,
  RegisterFailed,
  RegisterSuccess,
  ResetPasswordFailed,
  ResetPasswordSuccess,
} from './authStateTypes';
import { 
  ChangeEmailService,
  ChangePasswordService,
  ChangeProfileService,
  ConfirmEmailService, 
  ExternalLoginService, 
  ForgotPasswordService, 
  LoginService, 
  LogoutService, 
  RefreshService, 
  RegisterService, 
  ResetPasswordService 
} from 'services/auth/authServiceTypes';

export const registerAccount = createAsyncThunk<RegisterSuccess, RegisterService, { rejectValue: RegisterFailed }>(
  'auth/registerAccount',
  async ({ formData }: RegisterService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.registerAccount({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const loginAccount = createAsyncThunk<LoginSuccess, LoginService, { rejectValue: LoginFailed }>(
  'auth/loginAccount',
  async ({ formData }: LoginService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.loginAccount({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const facebookLogin = createAsyncThunk<LoginSuccess, ExternalLoginService, { rejectValue: LoginFailed }>(
  'auth/facebookLogin',
  async ({ formData }: ExternalLoginService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.facebookLogin({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const googleLogin = createAsyncThunk<LoginSuccess, ExternalLoginService, { rejectValue: LoginFailed }>(
  'auth/googleLogin',
  async ({ formData }: ExternalLoginService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.googleLogin({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const confirmEmail = createAsyncThunk<ConfirmEmailSuccess, ConfirmEmailService, { rejectValue: ConfirmEmailFailed }>(
  'auth/confirmEmail',
  async ({ formData }: ConfirmEmailService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.confirmEmail({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const refreshAccount = createAsyncThunk<RefreshSuccess, RefreshService, { rejectValue: RefreshFailed }>(
  'auth/refreshAccount',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.refreshAccount();
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const logoutAccount = createAsyncThunk<LogoutSuccess, LogoutService, { rejectValue: LogoutFailed }>(
  'auth/logoutAccount',
  async ({ formData }: LogoutService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.logoutAccount({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const forgotPassword = createAsyncThunk<ForgotPasswordSuccess, ForgotPasswordService, { rejectValue: ForgotPasswordFailed }>(
  'auth/forgotPassword',
  async ({ formData }: ForgotPasswordService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.forgotPassword({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const resetPassword = createAsyncThunk<ResetPasswordSuccess, ResetPasswordService, { rejectValue: ResetPasswordFailed }>(
  'auth/resetPassword',
  async ({ formData }: ResetPasswordService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.resetPassword({ formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const changePassword = createAsyncThunk<ChangePasswordSuccess, ChangePasswordService, { rejectValue: ChangePasswordFailed }>(
  'auth/changePassword',
  async ({ axiosJWT, id, formData }: ChangePasswordService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.changePassword({ axiosJWT, id, formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const changeEmail = createAsyncThunk<ChangeEmailSuccess, ChangeEmailService, { rejectValue: ChangeEmailFailed }>(
  'auth/changeEmail',
  async ({ axiosJWT, id, formData }: ChangeEmailService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.changeEmail({ axiosJWT, id, formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const changeProfile = createAsyncThunk<ChangeProfileSuccess, ChangeProfileService, { rejectValue: ChangeProfileFailed }>(
  'auth/changeProfile',
  async ({ axiosJWT, id, formData }: ChangeProfileService, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.changeProfile({ axiosJWT, id, formData });
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);
