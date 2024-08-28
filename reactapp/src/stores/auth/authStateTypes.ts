import { 
  ConfirmEmailModel, 
  ForgotPasswordModel, 
  LoginModel, 
  RegisterModel, 
  ResetPasswordModel 
} from "models/DTOs/authModel";
import { 
  ChangeEmailModel, 
  ChangePasswordModel, 
  ProfileFormModel, 
} from "models/DTOs/userModel";
import { 
  BaseAuthState, 
  BaseAuthFailed, 
  BaseLoginSuccess, 
  BaseRegisterSuccess, 
  BaseResponseState, 
  BaseStatusState 
} from "../baseStateTypes";

export interface AuthState extends BaseAuthState, BaseStatusState<
  | RegisterModel 
  | LoginModel 
  | ConfirmEmailModel 
  | ForgotPasswordModel 
  | ResetPasswordModel
  | ChangePasswordModel
  | ChangeEmailModel
  | ProfileFormModel> { }

export interface RegisterSuccess extends BaseRegisterSuccess { }

export interface LoginSuccess extends BaseLoginSuccess { }

export interface ConfirmEmailSuccess extends BaseLoginSuccess { }

export interface RefreshSuccess extends BaseLoginSuccess { }

export interface LogoutSuccess extends BaseResponseState { }

export interface ForgotPasswordSuccess extends BaseResponseState { }

export interface ResetPasswordSuccess extends BaseResponseState { }

export interface ChangePasswordSuccess extends BaseLoginSuccess { }

export interface ChangeEmailSuccess extends BaseLoginSuccess { }

export interface ChangeProfileSuccess extends BaseLoginSuccess { }

export interface RegisterFailed extends BaseAuthFailed<RegisterModel> { }

export interface LoginFailed extends BaseAuthFailed<LoginModel> { }

export interface ConfirmEmailFailed extends BaseResponseState { }

export interface RefreshFailed extends BaseResponseState { }

export interface LogoutFailed extends BaseResponseState { }

export interface ForgotPasswordFailed extends BaseAuthFailed<ForgotPasswordModel> { }

export interface ResetPasswordFailed extends BaseAuthFailed<ResetPasswordModel> { }

export interface ChangePasswordFailed extends BaseAuthFailed<ResetPasswordModel> { }

export interface ChangeEmailFailed extends BaseAuthFailed<ResetPasswordModel> { }

export interface ChangeProfileFailed extends BaseAuthFailed<ResetPasswordModel> { }
