import { FC, useEffect, useMemo } from 'react';
import { Button, Card, FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { newsStore } from 'stores/news/newsSlice';
import { NewsState } from 'stores/news/newsStateTypes';
import { NewsFormTypes } from './types/formTypes';
import { NewsFormModel } from 'models/DTOs/newsModel';
import { QueryModel } from 'models/Query/queryModel';
import { CategoryViewModel } from 'models/DTOs/categoryModel';

import FormUpsert from 'components/Form/FormUpsert';
import FormFileInput from 'components/Form/FormFileInput';
import FormSelectInput from 'components/Form/FormSelectInput';
import configs from 'configs';
import useGetCategories from 'hooks/categoryCRUD/useGetCategories';
import FormTextInput from 'components/Form/FormTextInput';
import FormTextAreaInput from 'components/Form/FormTextAreaInput';
import FormTextEditorInput from 'components/Form/FormTextEditorInput';
import useFormTextEditor from 'components/Form/hooks/useFormTextEditor';

const categoryQueryModel: QueryModel<CategoryViewModel> = {
  ...configs.query.categories,
  pageSize: 50,
};

const NewsForm: FC<NewsFormTypes> = ({ formData, formValidation, setFormData, onChange, onSubmit }) => {
  const { isLoading, errors }: NewsState = useSelector(newsStore);
  const { records } = useGetCategories(categoryQueryModel);
  const { textEditor, handleEditText, handleReadyEditor } = useFormTextEditor();

  useEffect(() => {
    if (!setFormData || !textEditor) return;
    setFormData(prev => ({ ...prev, content: textEditor }));
  }, [textEditor, setFormData]);

  const categoryOptions = useMemo(() => {
    return records?.map(record => ({
      label: record.name,
      value: record.id,
    }));
  }, [records]);

  const imageValue = useMemo(() => {
    if (!formData.image) return;
    return formData.file?.size ? URL.createObjectURL(formData.file) : `${process.env.REACT_APP_SERVER_DOMAIN}/${formData.image}`;
  }, [formData.image, formData.file]);

  return (
    <Card className="shadow h-100">
      <Card.Body>
        <FormUpsert onSubmit={onSubmit}>
          <FormSelectInput
            label="Category"
            options={categoryOptions}
            error={errors?.categoryId ?? formValidation?.categoryId}
            name={'categoryId' as keyof NewsFormModel}
            value={formData.categoryId ?? ""}
            disabled={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="Title"
            error={errors?.title ?? formValidation?.title}
            name={'title' as keyof NewsFormModel}
            value={formData.title ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextAreaInput
            label="Summary"
            error={errors?.summary ?? formValidation?.summary}
            name={'summary' as keyof NewsFormModel}
            value={formData.summary ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormFileInput
            label="Image"
            error={errors?.image ?? formValidation?.image}
            name={'image' as keyof NewsFormModel}
            value={imageValue ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextEditorInput
            label="Content"
            error={errors?.content ?? formValidation?.content}
            name={'content' as keyof NewsFormModel}
            value={formData.content ?? ""}
            onEditor={setFormData && handleEditText}
            onReady={handleReadyEditor}
          />
          {onSubmit && (
            <FormGroup className="d-flex">
              <Button variant="primary" className="flex-md-grow-0 flex-grow-1 px-lg-5" type="submit" disabled={isLoading}>
                Save changes
              </Button>
            </FormGroup>
          )}
        </FormUpsert>
      </Card.Body>
    </Card>
  );
};

export default NewsForm;
