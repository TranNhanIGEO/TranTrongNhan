import { FormControlProps } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export interface FormTextEditorInputProps extends FormControlProps {
  label?: string;
  error?: string;
  onReady?: (editor: ClassicEditor) => void;
  onEditor?: (event: any, editor: ClassicEditor) => void;
}
