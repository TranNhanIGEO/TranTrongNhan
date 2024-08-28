import * as yup from 'yup';
import ValidatorHelper from 'helpers/validatorHelper';
import NumberHelper from 'helpers/numberHelper';

export const productSchema = yup.object().shape({
  categoryId: yup.string().required('Category is required!'),
  name: yup.string().required('Name is required!')
    .max(25, "Name can't exceed 25 characters!"),
  description: yup.string().required('Description is required!')
    .max(256, "Description can't exceed 256 characters!"),
  price: yup.string().required('Price is required!')
    .test("is-valid-decimal", "Price must be a valid decimal number in the format 100,000.00", value => !value || ValidatorHelper.isDecimalString(value))
    .test("is-greater-than", "Price must be greater than 0", value => !value || ValidatorHelper.isGreaterThanOrEqualTo(NumberHelper.toDecimalNumber(value), 0))
    .test("is-less-than", "Price must be less than 10,000,000", value => !value || ValidatorHelper.isLessThanOrEqualTo(NumberHelper.toDecimalNumber(value), 10000000)),
  image: yup.string().required('Image is required!')
    .max(256, "Image can't exceed 256 characters"),
  file: yup.mixed<File>()
    .nullable() 
    .test("is-valid-type", "Unsupported file format", value => !value ? true : ValidatorHelper.isSupportedFile(value.type, "image"))
    .test("is-valid-size", "File size exceeds 10 MB", value => !value ? true : ValidatorHelper.isFileSizeValid(value.size, 10 * 1024 * 1024)),
});