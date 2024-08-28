import * as yup from 'yup';
import ValidatorHelper from 'helpers/validatorHelper';

export const feedbackSchema = yup.object().shape({
  productId: yup.string().required('Product is required!'),
  vote: yup.number()
    .integer("Vot must be a integer")
    .min(1, "Vote must be less than or equal to 1 star!")
    .max(5, "Vote must be greater than or equal to 5 star!"),
  fullName: yup.string()
    .required("FullName is required"),
  email: yup.string().email('Email is invalid')
    .required('Email is required!')
    .min(8, 'Email must be between 8 and 32 characters!')
    .max(32, 'Email must be between 8 and 32 characters!'),
  comment: yup.string()
    .required("Comment is required")
    .max(150, "Comment can't exceed 150 characters!"),
  image: yup.string()
    .nullable()
    .max(256, "Image can't exceed 256 characters"),
  file: yup.mixed<File>()
    .nullable() 
    .test("is-valid-type", "Unsupported file format", value => !value ? true : ValidatorHelper.isSupportedFile(value.type, "image"))
    .test("is-valid-size", "File size exceeds 10 MB", value => !value ? true : ValidatorHelper.isFileSizeValid(value.size, 10 * 1024 * 1024)),
});
