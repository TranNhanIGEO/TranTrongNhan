import { FC, lazy } from "react";

export const LoginPage: FC = lazy(() => import("./Login"));
export const RegisterPage: FC = lazy(() => import("./Register"));
export const ConfirmEmailPage: FC = lazy(() => import("./ConfirmEmail"));
export const ForgotPasswordPage: FC = lazy(() => import("./ForgotPassword"));
export const ResetPasswordPage: FC = lazy(() => import("./ResetPassword"));
export const ChangePasswordPage: FC = lazy(() => import("./ChangePassword"));
export const ProfilePage: FC = lazy(() => import("./Profile"));
