import * as yup from 'yup';
import ValidatorHelper from 'helpers/validatorHelper';
import NumberHelper from 'helpers/numberHelper';
import DateHelper from 'helpers/dateHelper';

export const promotionSchema = yup.object().shape({
  name: yup.string().required('Name is required!')
    .max(25, "Name can't exceed 25 characters!"),
  description: yup.string().required('Description is required!')
    .max(150, "Description can't exceed 150 characters!"),
  discount: yup.string()
    .test("is-valid-decimal", "Discount must be a valid decimal number in the format 100,000.00", value => !value || ValidatorHelper.isDecimalString(value))
    .test("is-greater-than", "Discount must be greater than 0", value => !value || ValidatorHelper.isGreaterThanOrEqualTo(NumberHelper.toDecimalNumber(value), 0))
    .test("is-less-than", "Discount must be less than 1,000,000", value => !value || ValidatorHelper.isLessThanOrEqualTo(NumberHelper.toDecimalNumber(value), 1000000)),
  discountPercentage: yup.string()
    .test("is-valid-decimal", "DiscountPercentage must be a valid decimal number in the format 100,000.00", value => !value || ValidatorHelper.isDecimalString(value))
    .test("is-greater-than", "DiscountPercentage must be greater than 0", value => !value || ValidatorHelper.isGreaterThanOrEqualTo(NumberHelper.toDecimalNumber(value), 0))
    .test("is-less-than", "DiscountPercentage must be less than 50%", value => !value || ValidatorHelper.isLessThanOrEqualTo(NumberHelper.toDecimalNumber(value), 50)),
  startAt: yup.date().required('StartAt is required')
    .min(DateHelper.getCurrentDateTime(), 'StartAt must be in the future or present')
    .max(yup.ref('endAt'), 'StartAt must be before or the same as EndAt')
    .typeError('StartAt must be a valid date and time'),
  
  endAt: yup.date().required('EndAt is required')
    .min(yup.ref('startAt'), 'EndAt must be after StartAt')
    .typeError('EndAt must be a valid date and time'),
});