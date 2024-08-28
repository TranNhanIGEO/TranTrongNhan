import './styles/index.scss';
import { Table } from 'react-bootstrap';
import { useCallback, useMemo } from 'react';
import { TableContainer, TableBody, TableBodyCell, TableHead, TableHeadCell, TableRow } from '.';
import StringHelper from 'helpers/stringHelper';
import DateHelper from 'helpers/dateHelper';
import { TableDataProps } from './types/tableDataTypes';
import { TEXT_FORM, PASSWORD_FORM, NUMBER_FORM, EMAIL_FORM, TEL_FORM, TEXTAREA_FORM, DATE_FORM, DATETIME_FORM, FILE_FORM } from 'constants/form';

const cellTypes = {
  [FILE_FORM]: (data: any) => <img className="rounded-4" src={`${process.env.REACT_APP_SERVER_DOMAIN}/${data}`} alt="" />,
  [DATE_FORM]: (data: any) => <p className="fs-7">{DateHelper.toDateTimeString(data)}</p>,
  [DATETIME_FORM]: (data: any) => <p className="fs-7">{DateHelper.toDateTimeString(data)}</p>,
  [TEXT_FORM]: (data: any) => <p className={'fs-7' + StringHelper.toClassName(data)}>{data}</p>,
  [NUMBER_FORM]: (data: any) => cellTypes.text(data),
  [EMAIL_FORM]: (data: any) => cellTypes.text(data),
  [TEL_FORM]: (data: any) => cellTypes.text(data),
  [TEXTAREA_FORM]: (data: any) => cellTypes.text(data),
  [PASSWORD_FORM]: (data: any) => cellTypes.text(data),
};

const TableData = <T,>({ state, columns, rows, onSortChange, renderBodyActions }: TableDataProps<T>) => {
  const tableHeadCells = useMemo(() => {
    return columns.map(col => (
      <TableHeadCell
        key={col.key as string}
        viewing={col.viewing}
        sorting={col.sorting}
        sortingDir={state?.sortBy === col.key ? state?.sortDirection : undefined}
        onClick={() => col.sorting && onSortChange && onSortChange(col.key)}
      >
        <span className="fw-semibold mb-0">{col.label}</span>
      </TableHeadCell>
    ));
  }, [columns, state?.sortBy, state?.sortDirection, onSortChange]);

  const tableHeadActionCell = useMemo(() => {
    return (
      renderBodyActions && (
        <TableHeadCell className="text-center" viewing={true}>
          <span className="fw-semibold mb-0">Hành động</span>
        </TableHeadCell>
      )
    );
  }, [renderBodyActions]);

  const tableHeadRow = useMemo(() => {
    return (
      <TableRow>
        {tableHeadCells}
        {tableHeadActionCell}
      </TableRow>
    );
  }, [tableHeadCells, tableHeadActionCell]);

  const tableBodyCells = useCallback(
    (item: T) => {
      return columns.map(col => (
        <TableBodyCell key={col.key as string} viewing={col.viewing} searchTerm={state?.searchTerm}>
          {col.renderRow ? col.renderRow(item) : cellTypes[col.type ?? TEXT_FORM](item[col.key] as string)}
        </TableBodyCell>
      ));
    },
    [columns, state?.searchTerm],
  );

  const tableBodyActionCell = useCallback(
    (item: T) => {
      return renderBodyActions && (
        <TableBodyCell viewing={true}>
          {renderBodyActions(item)}
        </TableBodyCell>
      );
    },
    [renderBodyActions],
  );

  const tableBodyRows = useMemo(() => {
    return rows.map((item, index) => (
      <TableRow key={index}>
        {tableBodyCells(item)}
        {tableBodyActionCell(item)}
      </TableRow>
    ));
  }, [rows, tableBodyCells, tableBodyActionCell]);

  const tableBodyStatusRow = useMemo(() => {
    return (
      <TableRow>
        <TableBodyCell viewing={true} colSpan={columns.length} className="text-center fst-italic">
          {state?.isLoading ? 'Loading...' : 'No records'}
        </TableBodyCell>
      </TableRow>
    );
  }, [state?.isLoading, columns]);

  return (
    <TableContainer className="table-responsive-xl overflow-auto">
      <Table hover={true}>
        <TableHead className="table-light">{tableHeadRow}</TableHead>
        <TableBody>{state?.isLoading || !rows.length ? tableBodyStatusRow : tableBodyRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
