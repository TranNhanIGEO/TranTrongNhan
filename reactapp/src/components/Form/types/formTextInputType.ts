import { FormControlProps } from "react-bootstrap";

export interface FormTextInputProps extends FormControlProps {
  label?: string;
  type?: string;
  error?: string;
}
