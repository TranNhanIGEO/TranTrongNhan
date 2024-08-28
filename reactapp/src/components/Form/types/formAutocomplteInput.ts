import { FormControlProps } from "react-bootstrap";

export interface FormAutocompleteInputProps extends FormControlProps {
  label?: string;
  options?: { value: string; label: string }[];
  error?: string;
  isOpenList: boolean;
  onOptionClick: (value: string) => void;
}
