import { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useFormTextEditor = () => {
  const [textEditor, setTextEditor] = useState<string>("");

  const handleReadyEditor = (editor: ClassicEditor) => {
    const root = editor.editing.view.document.getRoot();
    if (!root) return;
    editor.editing.view.change(writer => {
      writer.setStyle("height", "500px", root);
    });
  }
  
  const handleEditText = (event: any, editor: ClassicEditor) => {
    setTextEditor(editor.getData());
  }
  
  return {
    textEditor,
    handleEditText,
    handleReadyEditor,
  }
};

export default useFormTextEditor;
