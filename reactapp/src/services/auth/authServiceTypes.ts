import { AxiosParam, FormDataParam, IdentifierParam } from "services/baseServiceTypes";
import { 
  ConfirmEmailModel, 
  ExternalLoginModel, 
  ForgotPasswordModel, 
  LoginModel, 
  LogoutModel, 
  RegisterModel, 
  ResetPasswordModel 
} from "models/DTOs/authModel";
import { 
  ChangeEmailModel,
  ChangePasswordModel,
  ProfileFormModel,
} from "models/DTOs/userModel";

export interface RegisterService extends FormDataParam<RegisterModel> { }
export interface LoginService extends FormDataParam<LoginModel> { }
export interface ExternalLoginService extends FormDataParam<ExternalLoginModel> { }
export interface ConfirmEmailService extends FormDataParam<ConfirmEmailModel> { }
export interface RefreshService { }
export interface LogoutService extends FormDataParam<LogoutModel> { }
export interface ForgotPasswordService extends FormDataParam<ForgotPasswordModel> { }
export interface ResetPasswordService extends FormDataParam<ResetPasswordModel> { }
export interface ChangePasswordService extends FormDataParam<ChangePasswordModel>, IdentifierParam, AxiosParam { }
export interface ChangeEmailService extends FormDataParam<ChangeEmailModel>, IdentifierParam, AxiosParam { }
export interface ChangeProfileService extends FormDataParam<ProfileFormModel>, IdentifierParam, AxiosParam { }