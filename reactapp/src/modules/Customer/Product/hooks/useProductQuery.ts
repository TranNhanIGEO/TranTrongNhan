import { ChangeEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFormData from 'hooks/common/useFormData';
import useDebounce from 'hooks/common/useDebounce';
import { ProductQueryModel } from 'models/Query/productQueryModel';

const useProductQuery = (productQueryModel: ProductQueryModel) => {
  const { formData, handleSetFormData } = useFormData(productQueryModel);
  const { state } = useLocation();
  const debouncedQuery = useDebounce(formData, 500);

  useEffect(() => {
    if (!state?.categoryId) return;
    handleSetFormData("categoryIds", [state.categoryId]);
  }, [state, handleSetFormData])

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked && !formData.categoryIds?.includes(value)) {
      handleSetFormData("categoryIds", [...formData.categoryIds as string[], value]);
    } else {
      handleSetFormData("categoryIds", formData.categoryIds?.filter(val => val !== value));
    }
  }

  const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const [fromValue, toValue] = value.split('-');

    if (checked && !formData.fromValues?.includes(fromValue) && !formData.toValues?.includes(toValue)) {
      handleSetFormData("fromValues", [...formData.fromValues as string[], fromValue]);
      handleSetFormData("toValues", [...formData.toValues as string[], toValue]);
    } else {
      handleSetFormData("fromValues", formData.fromValues?.filter(val => val !== fromValue));
      handleSetFormData("toValues", formData.toValues?.filter(val => val !== toValue));
    }
  }

  return {
    productQuery: formData,
    debouncedProductQuery: debouncedQuery,
    handleCategoryChange,
    handlePriceRangeChange,
  };
};

export default useProductQuery;
