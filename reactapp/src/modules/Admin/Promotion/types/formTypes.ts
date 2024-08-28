import { FormControlElementTypes } from "components/Form/types/formTypes";
import { PromotionFormModel } from "models/DTOs/promotionModel";
import { ValidationModel } from "models/validationModel";
import { ChangeEvent, FormEvent } from "react";

export interface PromotionFormTypes {
  formData: PromotionFormModel;
  formValidation?: ValidationModel<PromotionFormModel>;
  onChange?: (e: ChangeEvent<FormControlElementTypes>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
