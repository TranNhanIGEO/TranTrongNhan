import { ChangeEvent } from 'react';
import { QueryModel } from 'models/Query/queryModel';
import { TableSortDirections } from 'components/Table/types/tableTypes';
import { INIT_PAGE_INDEX, ORDER_BY_ASC, ORDER_BY_DESC, ORDER_BY_NONE } from 'constants/table';
import useDebounce from 'hooks/common/useDebounce';
import useFormData from './useFormData';

const useQuery = <T>(queryModel: QueryModel<T>) => {
  const { formData, handleSetFormData } = useFormData<QueryModel<T>>(queryModel);
  const debouncedQuery = useDebounce(formData, 500);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSetFormData('searchTerm', value);
    handleSetFormData('pageIndex', INIT_PAGE_INDEX);
  };

  const handlePageIndex = (index: number) => {
    handleSetFormData('pageIndex', index);
  };

  const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    handleSetFormData('pageSize', Number(value));
  };

  const handleSort = (key: keyof T, direction?: TableSortDirections) => {
    if (!direction) {
      switch (formData.sortDirection) {
        case ORDER_BY_NONE: direction = ORDER_BY_ASC; break;
        case ORDER_BY_ASC: direction = ORDER_BY_DESC; break;
        case ORDER_BY_DESC: default: direction = ORDER_BY_NONE; break;
      }
    }

    handleSetFormData('sortBy', key);
    handleSetFormData('sortDirection', direction);
  };

  return {
    query: formData,
    debouncedQuery,
    handleSort,
    handlePageIndex,
    handlePageSize,
    handleSearchChange,
  };
};

export default useQuery;
