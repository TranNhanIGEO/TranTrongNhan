import { ChangeEvent } from 'react';
import { FormControlElementTypes } from 'components/Form/types/formTypes';
import { CHECKBOX_FORM, FILE_FORM, NUMBER_FORM } from 'constants/form';
import NumberHelper from 'helpers/numberHelper';
import useFormData from 'hooks/common/useFormData';

const useFormControl = <T>(initialData: T) => {
  const { formData, setFormData } = useFormData<T>(initialData);

  const handleChange = (e: ChangeEvent<FormControlElementTypes>) => {
    const { name, value, type } = e.target;
    const { files, checked } = e.target as HTMLInputElement;
    const dataType = e.target.getAttribute("datatype");

    if (type === CHECKBOX_FORM) {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    if (dataType === NUMBER_FORM) {
      setFormData(prev => ({ ...prev, [name]: NumberHelper.toDecimalString(value) }));
    } else if (dataType === FILE_FORM && files) {
      setFormData(prev => ({ ...prev, [name]: value, [FILE_FORM]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
  };
};

export default useFormControl;
