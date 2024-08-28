import { FC } from 'react';

import { ProfileViewModel } from 'models/DTOs/userModel';
import { QueryModel } from 'models/Query/queryModel';
import { TableColumnProps } from 'components/Table/types/tableDataTypes';

import ManagementTable from 'components/Table/ManagementTable';
import configs from 'configs';

import useQuery from 'hooks/common/useQuery';
import useGetUsers from 'hooks/userR/useGetUsers';

const columns: TableColumnProps<ProfileViewModel>[] = configs.columns.users;
const queryModel: QueryModel<ProfileViewModel> = configs.query.users;

const UserTable: FC = () => {
  const { 
    query,
    debouncedQuery,
    handleSort,
    handlePageIndex,
    handlePageSize,
    handleSearchChange,
  } = useQuery<ProfileViewModel>(queryModel)
  
  const {
    isLoading,
    records, 
    totalRecords, 
    filteredRecords, 
  } = useGetUsers(debouncedQuery)
   
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
    />
  );
};

export default UserTable;
