import { FC, useMemo } from 'react';
import { Button, Card, FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { categoryStore } from 'stores/category/categorySlice';
import { CategoryState } from 'stores/category/categoryStateTypes';
import { CategoryFormTypes } from './types/formTypes';
import { CategoryFormModel } from 'models/DTOs/categoryModel';

import FormUpsert from 'components/Form/FormUpsert';
import FormFileInput from 'components/Form/FormFileInput';
import FormTextInput from 'components/Form/FormTextInput';

const CategoryForm: FC<CategoryFormTypes> = ({ formData, formValidation, onChange, onSubmit }) => {
  const { isLoading, errors }: CategoryState = useSelector(categoryStore);

  const imageValue = useMemo(() => {
    if (!formData.image) return;
    return formData.file?.size ? URL.createObjectURL(formData.file) : `${process.env.REACT_APP_SERVER_DOMAIN}/${formData.image}`;
  }, [formData.image, formData.file]);

  return (
    <Card className="shadow h-100">
      <Card.Body>
        <FormUpsert onSubmit={onSubmit}>
          <FormTextInput
            label="Category Name"
            error={errors?.name ?? formValidation?.name}
            name={'name' as keyof CategoryFormModel}
            value={formData.name ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormFileInput
            label="Image"
            error={errors?.image ?? formValidation?.image}
            name={'image' as keyof CategoryFormModel}
            value={imageValue ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          {onSubmit && (
            <FormGroup className='d-flex'>
              <Button variant="primary" className='flex-md-grow-0 flex-grow-1 px-lg-5' type="submit" disabled={isLoading}>
                Save changes
              </Button>
            </FormGroup>
          )}
        </FormUpsert>
      </Card.Body>
    </Card>
  );
};

export default CategoryForm;
