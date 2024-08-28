import { FC } from 'react';
import { Button, Card, FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { promotionStore } from 'stores/promotion/promotionSlice';
import { PromotionState } from 'stores/promotion/promotionStateTypes';
import { PromotionFormTypes } from './types/formTypes';
import { PromotionFormModel } from 'models/DTOs/promotionModel';

import FormUpsert from 'components/Form/FormUpsert';
import FormTextInput from 'components/Form/FormTextInput';
import DateHelper from 'helpers/dateHelper';

const PromotionForm: FC<PromotionFormTypes> = ({ formData, formValidation, onChange, onSubmit }) => {
  const { isLoading, errors }: PromotionState = useSelector(promotionStore);

  return (
    <Card className="shadow h-100">
      <Card.Body>
        <FormUpsert onSubmit={onSubmit}>
          <FormTextInput
            label="Name"
            error={errors?.name ?? formValidation?.name}
            name={'name' as keyof PromotionFormModel}
            value={formData.name ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="Description"
            error={errors?.description ?? formValidation?.description}
            name={'description' as keyof PromotionFormModel}
            value={formData.description ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="Discount"
            type='number'
            error={errors?.discount ?? formValidation?.discount}
            name={'discount' as keyof PromotionFormModel}
            value={formData.discount ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="Discount Percentage"
            type='number'
            error={errors?.discountPercentage ?? formValidation?.discountPercentage}
            name={'discountPercentage' as keyof PromotionFormModel}
            value={formData.discountPercentage ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="Start At"
            type='datetime-local'
            error={errors?.startAt ?? formValidation?.startAt}
            name={'startAt' as keyof PromotionFormModel}
            min={DateHelper.toISOString(DateHelper.getCurrentDateTime())}
            value={formData.startAt ?? ""}
            readOnly={!onChange}
            onChange={onChange && onChange}
          />
          <FormTextInput
            label="End At"
            type='datetime-local'
            error={errors?.endAt ?? formValidation?.endAt}
            min={DateHelper.toISOString(DateHelper.getCurrentDateTime())}
            name={'endAt' as keyof PromotionFormModel}
            value={formData.endAt ?? ""}
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

export default PromotionForm;
