import clsx from 'clsx';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { FormTextEditorInputProps } from './types/formTextEditorInputType';
import configs from 'configs';

const editorConfig = configs.textEditor;

const FormTextEditorInput: FC<FormTextEditorInputProps> = ({ label, error, value, onEditor, onReady }) => {
  const labelClass = clsx({
    'is-invalid': !!error,
  });

  return (
    <Form.Group className="mb-5">
      <Form.Label className={labelClass}>{label}</Form.Label>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={value?.toString()}
        onReady={onReady}
        onChange={onEditor}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormTextEditorInput;
