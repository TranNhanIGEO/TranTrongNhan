import { FormControlElementTypes } from "components/Form/types/formTypes";
import { BannerFormModel } from "models/DTOs/bannerModel";
import { ValidationModel } from "models/validationModel";
import { ChangeEvent, FormEvent } from "react";

export interface BannerFormTypes {
  formData: BannerFormModel;
  formValidation?: ValidationModel<BannerFormModel>;
  onChange?: (e: ChangeEvent<FormControlElementTypes>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
