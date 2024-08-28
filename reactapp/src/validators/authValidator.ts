import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required!')
    .min(8, 'Email must be between 8 and 32 characters!')
    .max(32, 'Email must be between 8 and 32 characters!'),
  userName: yup.string().required('UserName is required!')
    .min(8, 'UserName must be between 8 and 32 characters!')
    .max(32, 'UserName must be between 8 and 32 characters!'),
  password: yup.string().required('Password is required!')
    .min(8, 'Password must be between 8 and 32 characters!')
    .max(32, 'Password must be between 8 and 32 characters!'),
  confirmPassword: yup.string().required('ConfirmPassword is required!')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});

export const loginSchema = yup.object().shape({
  userNameOrEmail: yup.string().required('UserNameOrEmail is required!')
    .min(8, 'UserNameOrEmail must be between 8 and 32 characters!')
    .max(32, 'UserNameOrEmail must be between 8 and 32 characters!'),
  password: yup.string().required('Password is required!')
    .min(8, 'Password must be between 8 and 32 characters!')
    .max(32, 'Password must be between 8 and 32 characters!')
});

export const confirmEmailSchema = yup.object().shape({
  userId: yup.string().required('UserId is required!'),
  code: yup.string().required('Code is required!')
});

export const logoutSchema = yup.object().shape({
  userId: yup.string().required('UserId is required!')
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required!')
    .min(8, 'Email must be between 8 and 32 characters!')
    .max(32, 'Email must be between 8 and 32 characters!')
});

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required!'),
  code: yup.string().required('Code is required!'),
  password: yup.string().required('Password is required!')
    .min(8, 'Password must be between 8 and 32 characters!')
    .max(32, 'Password must be between 8 and 32 characters!'),
  confirmPassword: yup.string().required('ConfirmPassword is required!')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});
