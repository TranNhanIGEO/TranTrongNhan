import { useMemo } from 'react';

const useCalculateRow = (pageIndex: number, pageSize: number, totalRecords: number, filteredRecords: number) => {
  const fromRow: number = useMemo(() => {
    const startRow: number = pageSize * (pageIndex - 1) + 1;
    return filteredRecords !== 0 ? startRow : filteredRecords;
  }, [filteredRecords, pageSize, pageIndex]);

  const toRow: number = useMemo(() => {
    const endRow: number = pageSize * pageIndex;
    return endRow < filteredRecords ? endRow : filteredRecords;
  }, [filteredRecords, pageSize, pageIndex]);

  const fiteredRows: number = useMemo(() => {
    return Math.min(totalRecords, filteredRecords);
  }, [totalRecords, filteredRecords]);

  const totalRows: number | false = useMemo(() => {
    return totalRecords !== filteredRecords && totalRecords;
  }, [totalRecords, filteredRecords]);

  return {
    fromRow,
    toRow,
    totalRows,
    fiteredRows,
  };
};

export default useCalculateRow;
