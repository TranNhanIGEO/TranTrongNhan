import { FormControlElementTypes } from "components/Form/types/formTypes";
import { ProductFormModel } from "models/DTOs/productModel";
import { ValidationModel } from "models/validationModel";
import { ChangeEvent, FormEvent } from "react";

export interface ProductFormTypes {
  formData: ProductFormModel;
  formValidation?: ValidationModel<ProductFormModel>;
  onChange?: (e: ChangeEvent<FormControlElementTypes>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
