import * as yup from "yup";
import ValidatorHelper from "helpers/validatorHelper";

export const categorySchema = yup.object().shape({
  name: yup.string()
    .required("Name is required")
    .max(25, "Name can't exceed 25 characters"),
  image: yup.string()
    .required("Image is required")
    .max(256, "Image can't exceed 256 characters"),
  file: yup.mixed<File>()
    .nullable() 
    .test("is-valid-type", "Unsupported file format", value => !value ? true : ValidatorHelper.isSupportedFile(value.type, "image"))
    .test("is-valid-size", "File size exceeds 10 MB", value => !value ? true : ValidatorHelper.isFileSizeValid(value.size, 10 * 1024 * 1024)),
});
