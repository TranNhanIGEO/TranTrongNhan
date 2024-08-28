import { FormSelectProps } from "react-bootstrap";

export interface FormSelectInputProps extends FormSelectProps {
  label?: string;
  options?: { value: string; label: string }[];
  error?: string;
}
