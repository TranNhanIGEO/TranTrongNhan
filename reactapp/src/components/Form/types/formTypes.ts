import { ValidationModel } from 'models/validationModel';
import { ChangeEvent, ReactNode } from 'react';
import { 
  TEXT_FORM, 
  PASSWORD_FORM, 
  NUMBER_FORM, 
  EMAIL_FORM, 
  TEL_FORM, 
  TEXTAREA_FORM, 
  DATE_FORM, 
  DATETIME_FORM,
  FILE_FORM
} from 'constants/form';

export type FormControlTypes = 
  | typeof TEXT_FORM 
  | typeof PASSWORD_FORM 
  | typeof NUMBER_FORM 
  | typeof EMAIL_FORM 
  | typeof TEL_FORM
  | typeof TEXTAREA_FORM
  | typeof DATE_FORM
  | typeof DATETIME_FORM
  | typeof FILE_FORM;

export type FormControlElementTypes = 
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
