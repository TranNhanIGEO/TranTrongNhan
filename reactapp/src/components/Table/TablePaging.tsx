import { Fragment, useEffect, useMemo, useRef } from 'react';
import { FormSelect, Pagination } from 'react-bootstrap';
import { PAGE_SIZES } from 'constants/table';
import { TablePagingProps } from './types/tablePagingTypes';
import useCalculatePage from './hooks/useCalculatePage';

const TablePaging = ({ state, onPageIndexChange, onPageSizeChange }: TablePagingProps) => {
  const { pageIndex, pageSize, totalRecords } = state;
  const selectRef = useRef<HTMLSelectElement>(null);

  const { totalPages } = useCalculatePage(pageSize, totalRecords);
  const isFirstPage = useMemo(() => pageIndex === 1 || !totalPages, [pageIndex, totalPages]);
  const isLastPage = useMemo(() => pageIndex === totalPages || !totalPages, [pageIndex, totalPages]);

  useEffect(() => {
    if (!selectRef.current) return;
    selectRef.current.classList.remove('form-select');
  }, []);

  const pageSizeOptions = useMemo(() => {
    return PAGE_SIZES.map(size => (
      <option key={size} value={size}>
        {size}
      </option>
    ));
  }, []);

  const pageIndexItems = useMemo(() => {
    const pageIndexes = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pageIndexes.map(number => (
      <Pagination.Item key={number} active={number === Number(pageIndex)} onClick={() => onPageIndexChange(number)}>
        {number}
      </Pagination.Item>
    ));
  }, [totalPages, pageIndex, onPageIndexChange]);

  return (
    <div className="d-flex align-items-center gap-3 fs-7">
      <Fragment>Rows per page</Fragment>
      <FormSelect ref={selectRef} value={pageSize} onChange={onPageSizeChange}>
        {pageSizeOptions}
      </FormSelect>
      <Pagination>
        <Pagination.First onClick={() => onPageIndexChange(1)} disabled={isFirstPage} />
        <Pagination.Prev onClick={() => onPageIndexChange(pageIndex - 1)} disabled={isFirstPage} />
        {totalPages ? pageIndexItems : <Pagination.Item>1</Pagination.Item>}
        <Pagination.Next onClick={() => onPageIndexChange(pageIndex + 1)} disabled={isLastPage} />
        <Pagination.Last onClick={() => onPageIndexChange(totalPages)} disabled={isLastPage} />
      </Pagination>
    </div>
  );
};

export default TablePaging;
