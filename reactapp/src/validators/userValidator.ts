import * as yup from 'yup';
import ValidatorHelper from 'helpers/validatorHelper';

export const changePasswordSchema = yup.object().shape({
    currentPassword: yup.string().required('CurrentPassword is required!'),
    newPassword: yup.string().required('NewPassword is required!')
      .min(8, 'NewPassword must be between 8 and 32 characters!')
      .max(32, 'NewPassword must be between 8 and 32 characters!'),
    confirmPassword: yup.string().required('ConfirmPassword is required!')
      .oneOf([yup.ref('newPassword')], 'Passwords do not match')
  });
  
  export const changeEmailSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required!')
      .min(8, 'Email must be between 8 and 32 characters!')
      .max(32, 'Email must be between 8 and 32 characters!')
  });
  
  export const changeProfileSchema = yup.object().shape({
    phoneNumber: yup.string()
      .max(12, "PhoneNumber can't exceed 12 characters!")
      .test("is-valid-phone-number", "PhoneNumber is invalid", value => !value || ValidatorHelper.isValidPhoneNumber(value)),
    fullName: yup.string()
      .max(32, "FullName can't exceed 256 characters!"),
    homeAddress: yup.string()
      .max(32, "HomeAddress can't exceed 256 characters!"),
    avatar: yup.string()
      .max(256, "Avatar can't exceed 256 characters"),
    file: yup.mixed<File>()
      .nullable() 
      .test("is-valid-type", "Unsupported file format", value => !value ? true : ValidatorHelper.isSupportedFile(value.type, "image"))
      .test("is-valid-size", "File size exceeds 10 MB", value => !value ? true : ValidatorHelper.isFileSizeValid(value.size, 10 * 1024 * 1024)),
  });
  