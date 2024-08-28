import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { OrderViewModel } from 'models/DTOs/orderModel';
import { QueryModel } from 'models/Query/queryModel';
import { TableColumnProps } from 'components/Table/types/tableDataTypes';

import ManagementTable from 'components/Table/ManagementTable';
import configs from 'configs';

import useQuery from 'hooks/common/useQuery';
import useGetOrders from 'hooks/orderCRUD/useGetOrders';

const columns: TableColumnProps<OrderViewModel>[] = configs.columns.orders;
const queryModel: QueryModel<OrderViewModel> = configs.query.orders;
const routes = configs.routes.admin.order;

const OrderTable: FC = () => {
  const { 
    query,
    debouncedQuery,
    handleSort,
    handlePageIndex,
    handlePageSize,
    handleSearchChange,
  } = useQuery<OrderViewModel>(queryModel)
  
  const {
    isLoading,
    records, 
    totalRecords, 
    filteredRecords, 
  } = useGetOrders(debouncedQuery)
   
  return (
    <ManagementTable
      rows={records}
      columns={columns}
      onSearchChange={handleSearchChange}
      onSortChange={handleSort}
      onPageIndexChange={handlePageIndex}
      onPageSizeChange={handlePageSize}
      state={{
        ...query,
        isLoading,
        totalRecords,
        filteredRecords
      }}
      renderBodyActions={(item: OrderViewModel) => (
        <Link to={`${routes.root}/${item.id}`}>
          <FiEye className="me-md-2 text-info" size={24} />
        </Link>
      )}
    />
  );
};

export default OrderTable;
