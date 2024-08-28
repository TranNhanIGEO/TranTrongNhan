import { FormControlElementTypes } from "components/Form/types/formTypes";
import { CategoryFormModel } from "models/DTOs/categoryModel";
import { ValidationModel } from "models/validationModel";
import { ChangeEvent, FormEvent } from "react";

export interface CategoryFormTypes {
  formData: CategoryFormModel;
  formValidation?: ValidationModel<CategoryFormModel>;
  onChange?: (e: ChangeEvent<FormControlElementTypes>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
