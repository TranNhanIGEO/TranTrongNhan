import { axiosAPI } from 'utilities/axiosAPI';
import configs from 'configs';
import {
  ChangeEmailService,
  ChangePasswordService,
  ChangeProfileService,
  ConfirmEmailService,
  ExternalLoginService,
  ForgotPasswordService,
  LoginService,
  LogoutService,
  RegisterService,
  ResetPasswordService,
} from './authServiceTypes';

class AuthService {
  static registerAccount = async ({ formData }: RegisterService) => {
    const { confirmPassword, ...userData } = formData;
    return await axiosAPI.post(configs.apis.auth.register, userData);
  };

  static confirmEmail = async ({ formData }: ConfirmEmailService) => {
    return await axiosAPI.post(configs.apis.auth.confirmEmail, formData);
  };

  static loginAccount = async ({ formData }: LoginService) => {
    return await axiosAPI.post(configs.apis.auth.login, formData);
  };

  static facebookLogin = async ({ formData }: ExternalLoginService) => {
    return await axiosAPI.post(configs.apis.auth.facebookLogin, formData);
  };

  static googleLogin = async ({ formData }: ExternalLoginService) => {
    return await axiosAPI.post(configs.apis.auth.googleLogin, formData);
  };

  static refreshAccount = async () => {
    return await axiosAPI.post(configs.apis.auth.refresh);
  };

  static logoutAccount = async ({ formData }: LogoutService) => {
    return await axiosAPI.post(configs.apis.auth.logout, formData);
  };

  static forgotPassword = async ({ formData }: ForgotPasswordService) => {
    return await axiosAPI.post(configs.apis.auth.forgotPassword, formData);
  };

  static resetPassword = async ({ formData }: ResetPasswordService) => {
    const { confirmPassword, ...userData } = formData;
    return await axiosAPI.post(configs.apis.auth.resetPassword, userData);
  };

  static changePassword = async ({ id, formData }: ChangePasswordService) => {
    const { confirmPassword, ...userData } = formData;
    return await axiosAPI.post(configs.apis.auth.changePassword + "/" + id, userData);
  };

  static changeEmail = async ({ id, formData }: ChangeEmailService) => {
    return await axiosAPI.post(configs.apis.auth.changeEmail + "/" + id, formData);
  };

  static changeProfile = async ({ id, formData }: ChangeProfileService) => {
    return await axiosAPI.post(configs.apis.auth.changeProfile + "/" + id, formData);
  };
}

export default AuthService;
