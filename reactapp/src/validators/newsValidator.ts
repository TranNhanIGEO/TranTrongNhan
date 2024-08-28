import * as yup from 'yup';
import ValidatorHelper from 'helpers/validatorHelper';

export const newsSchema = yup.object().shape({
  categoryId: yup.string().nullable(),
  title: yup.string().required('Title is required!')
    .max(100, "Title can't exceed 100 characters!"),
  summary: yup.string().required('Summary is required!')
    .max(256, "Summary can't exceed 256 characters!"),
  content: yup.string().required('Content is required!')
    .min(100, "Content can't be shorter than 100 characters!"),
  image: yup.string()
    .required("Image is required")
    .max(256, "Image can't exceed 256 characters"),
  file: yup.mixed<File>()
    .nullable() 
    .test("is-valid-type", "Unsupported file format", value => !value ? true : ValidatorHelper.isSupportedFile(value.type, "image"))
    .test("is-valid-size", "File size exceeds 10 MB", value => !value ? true : ValidatorHelper.isFileSizeValid(value.size, 10 * 1024 * 1024))
});