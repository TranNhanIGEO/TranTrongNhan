import { useMemo } from 'react';

const useCalculatePage = (pageSize: number, totalRecords: number) => {
  const totalPages: number = useMemo(() => {
    return Math.ceil((totalRecords / pageSize) as number);
  }, [totalRecords, pageSize]);

  return {
    totalPages,
  };
};

export default useCalculatePage;
