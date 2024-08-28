import { FormControlElementTypes } from "components/Form/types/formTypes";
import { OrderFormModel } from "models/DTOs/orderModel";
import { ValidationModel } from "models/validationModel";
import { ChangeEvent, FormEvent } from "react";

export interface CheckoutFormProps {
    formData: OrderFormModel;
    formValidation?: ValidationModel<OrderFormModel>;
    onChange?: (e: ChangeEvent<FormControlElementTypes>) => void;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}