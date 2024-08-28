import { ValidationModel } from 'models/validationModel';
import { useState } from 'react';
import { ObjectSchema, ValidationError } from 'yup';

const useValidation = <T>(schema: ObjectSchema<any>) => {
  const [validationErrors, setValidationErrors] = useState<ValidationModel<T>>({} as ValidationModel<T>);

  const handleValidate = async (formData: T): Promise<boolean> => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setValidationErrors({} as ValidationModel<T>)
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: ValidationModel<T> = {} as ValidationModel<T>;
        error.inner.forEach(err => errors[err.path as keyof T] = err.message);
        setValidationErrors(errors);
      }
      return false;
    }
  };

  return {
    validationErrors,
    handleValidate,
  };
};

export default useValidation;
