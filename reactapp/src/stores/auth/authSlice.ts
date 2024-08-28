import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileViewModel } from 'models/DTOs/userModel';
import EncryptionHelper from 'helpers/encryptionHelper';
import { RootState } from 'stores/store';
import { 
  changeEmail,
  changePassword,
  changeProfile,
  confirmEmail, 
  facebookLogin, 
  forgotPassword, 
  googleLogin, 
  loginAccount, 
  logoutAccount, 
  refreshAccount, 
  registerAccount, 
  resetPassword 
} from './authThunks';
import {
  LoginSuccess,
  AuthState,
  LoginFailed,
  RegisterFailed,
  RegisterSuccess,
  ConfirmEmailSuccess,
  ConfirmEmailFailed,
  LogoutSuccess,
  LogoutFailed,
  ForgotPasswordSuccess,
  ForgotPasswordFailed,
  ResetPasswordSuccess,
  ResetPasswordFailed,
  RefreshSuccess,
  RefreshFailed,
  ChangePasswordSuccess,
  ChangePasswordFailed,
  ChangeEmailSuccess,
  ChangeEmailFailed,
  ChangeProfileSuccess,
  ChangeProfileFailed,
} from 'stores/auth/authStateTypes';

const userInfo: ProfileViewModel = {
  id: '',
  userName: '',
  email: '',
  phoneNumber: '',
  fullName: '',
  homeAddress: '',
  avatar: '',
  role: '',
};

const initState: AuthState = {
  isLoading: false,
  isSuccess: false,
  user: userInfo,
  token: null,
  errors: undefined,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    // Register
    builder.addCase(registerAccount.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(registerAccount.fulfilled, (state: AuthState, action: PayloadAction<RegisterSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errors = undefined;
      const { message } = action.payload;
      state.message = message;
    });
    builder.addCase(registerAccount.rejected, (state: AuthState, action: PayloadAction<RegisterFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Login
    builder.addCase(loginAccount.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(loginAccount.fulfilled, (state: AuthState, action: PayloadAction<LoginSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(loginAccount.rejected, (state: AuthState, action: PayloadAction<LoginFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Facebook Login
    builder.addCase(facebookLogin.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(facebookLogin.fulfilled, (state: AuthState, action: PayloadAction<LoginSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(facebookLogin.rejected, (state: AuthState, action: PayloadAction<LoginFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Google Login
    builder.addCase(googleLogin.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(googleLogin.fulfilled, (state: AuthState, action: PayloadAction<LoginSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(googleLogin.rejected, (state: AuthState, action: PayloadAction<LoginFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Confirm email
    builder.addCase(confirmEmail.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = '';
    });
    builder.addCase(confirmEmail.fulfilled, (state: AuthState, action: PayloadAction<ConfirmEmailSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(confirmEmail.rejected, (state: AuthState, action: PayloadAction<ConfirmEmailFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Refresh
    builder.addCase(refreshAccount.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = '';
    });
    builder.addCase(refreshAccount.fulfilled, (state: AuthState, action: PayloadAction<RefreshSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(refreshAccount.rejected, (state: AuthState, action: PayloadAction<RefreshFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Logout
    builder.addCase(logoutAccount.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = '';
    });
    builder.addCase(logoutAccount.fulfilled, (state: AuthState, action: PayloadAction<LogoutSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { message } = action.payload;
      state.message = message;
      state.token = null;
      state.user = userInfo;
    });
    builder.addCase(logoutAccount.rejected, (state: AuthState, action: PayloadAction<LogoutFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload?.message as string;
    });
    // Forgot password
    builder.addCase(forgotPassword.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(forgotPassword.fulfilled, (state: AuthState, action: PayloadAction<ForgotPasswordSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { message } = action.payload;
      state.message = message;
    });
    builder.addCase(forgotPassword.rejected, (state: AuthState, action: PayloadAction<ForgotPasswordFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Reset password
    builder.addCase(resetPassword.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(resetPassword.fulfilled, (state: AuthState, action: PayloadAction<ResetPasswordSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { message } = action.payload;
      state.message = message;
    });
    builder.addCase(resetPassword.rejected, (state: AuthState, action: PayloadAction<ResetPasswordFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Change password, reissue token
    builder.addCase(changePassword.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(changePassword.fulfilled, (state: AuthState, action: PayloadAction<ChangePasswordSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(changePassword.rejected, (state: AuthState, action: PayloadAction<ChangePasswordFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Change email, reissue token
    builder.addCase(changeEmail.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(changeEmail.fulfilled, (state: AuthState, action: PayloadAction<ChangeEmailSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(changeEmail.rejected, (state: AuthState, action: PayloadAction<ChangeEmailFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
    // Change profile, reissue token
    builder.addCase(changeProfile.pending, (state: AuthState) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.errors = undefined;
      state.message = '';
    });
    builder.addCase(changeProfile.fulfilled, (state: AuthState, action: PayloadAction<ChangeProfileSuccess>) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { token, message } = action.payload;
      const userView = EncryptionHelper.decodeToken(token) as ProfileViewModel;
      state.user = userView;
      state.token = token;
      state.message = message;
    });
    builder.addCase(changeProfile.rejected, (state: AuthState, action: PayloadAction<ChangeProfileFailed | undefined>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errors = action.payload?.errors;
      state.message = action.payload?.message as string;
    });
  },
});

export const authStore = (state: RootState) => state.auth;
export default authSlice.reducer;
