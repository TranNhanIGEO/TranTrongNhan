import * as yup from 'yup';
import ValidatorHelper from 'helpers/validatorHelper';
import NumberHelper from 'helpers/numberHelper';

export const orderSchema = yup.object().shape({
  sessionId: yup.string().required('Session is required!'),
  receiverName: yup.string().required('ReceiverName is required!')
    .max(50, "ReceiverName can't exceed 50 characters!"),
  receiverAddress: yup.string().required('ReceiverAddress is required!')
    .max(256, "ReceiverAddress can't exceed 256 characters!"),
  phoneNumber: yup.string().required('PhoneNumber is required!')
    .max(12, "PhoneNumber can't exceed 12 characters!")
    .test("is-valid-phone-number", "PhoneNumber is invalid", value => !value || ValidatorHelper.isValidPhoneNumber(value)),
  note: yup.string().nullable()
    .max(256, "Note can't exceed 256 characters"),
  quantity: yup.string().required('Quantity is required!')
    .min(0, "Quantity must be greater than zero"),
  totalAmount: yup.string().required('TotalAmount is required!')
    .test("is-valid-decimal", "TotalAmount must be a valid decimal number in the format 100,000.00", value => !value || ValidatorHelper.isDecimalString(value))
    .test("is-greater-than", "TotalAmount must be greater than 0", value => !value || ValidatorHelper.isGreaterThanOrEqualTo(NumberHelper.toDecimalNumber(value), 0))
    .test("is-less-than", "TotalAmount must be less than 100,000,000", value => !value || ValidatorHelper.isLessThanOrEqualTo(NumberHelper.toDecimalNumber(value), 100000000)),
  orderDetails: yup.array().required("Order details is required")
    .min(1, "Order details can't not be empty"),
});