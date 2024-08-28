export interface LoginModel {
  userNameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export interface ExternalLoginModel {
  token: string;
}

export interface RegisterModel {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface ConfirmEmailModel {
  userId: string;
  code: string;
}

export interface LogoutModel {
  userId: string;
}

export interface ForgotPasswordModel {
  email: string;
}

export interface ResetPasswordModel {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
