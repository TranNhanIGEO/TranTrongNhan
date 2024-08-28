import { FC, useMemo } from 'react';
import { Button, Card, FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { bannerStore } from 'stores/banner/bannerSlice';
import { BannerState } from 'stores/banner/bannerStateTypes';
import { BannerFormTypes } from './types/formTypes';
import { BannerFormModel } from 'models/DTOs/bannerModel';
import { QueryModel } from 'models/Query/queryModel';
import { CategoryViewModel } from 'models/DTOs/categoryModel';

import FormUpsert from 'components/Form/FormUpsert';
import FormFileInput from 'components/Form/FormFileInput';
import FormSelectInput from 'components/Form/FormSelectInput';
import configs from 'configs';
import useGetCategories from 'hooks/categoryCRUD/useGetCategories';

const categoryQueryModel: QueryModel<CategoryViewModel> = {
  ...configs.query.categories,
  pageSize: 50,
};

const BannerForm: FC<BannerFormTypes> = ({ formData, formValidation, onChange, onSubmit }) => {
  const { isLoading, errors }: BannerState = useSelector(bannerStore);
  const { records } = useGetCategories(categoryQueryModel);

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
            name={'categoryId' as keyof BannerFormModel}
            value={formData.categoryId ?? ""}
            disabled={!onChange}
            onChange={onChange && onChange}
          />
          <FormFileInput
            label="Image"
            error={errors?.image ?? formValidation?.image}
            name={'image' as keyof BannerFormModel}
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

export default BannerForm;
