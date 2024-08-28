import { useState } from 'react';

const useFormData = <T>(initData: T) => {
  const [formData, setFormData] = useState<T>(initData);

  const handleSetFormData = <K>(name: keyof T, value: K) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    handleSetFormData,
  };
};

export default useFormData;
