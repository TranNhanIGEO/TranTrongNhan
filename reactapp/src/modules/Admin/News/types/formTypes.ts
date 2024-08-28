import { FormControlElementTypes } from "components/Form/types/formTypes";
import { NewsFormModel } from "models/DTOs/newsModel";
import { ValidationModel } from "models/validationModel";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface NewsFormTypes {
  formData: NewsFormModel;
  formValidation?: ValidationModel<NewsFormModel>;
  setFormData?: Dispatch<SetStateAction<NewsFormModel>>;
  onChange?: (e: ChangeEvent<FormControlElementTypes>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
