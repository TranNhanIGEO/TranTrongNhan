import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosInstance } from 'axios';

import { ProfileViewModel } from 'models/DTOs/userModel';
import { QueryModel } from 'models/Query/queryModel';
import { getUsers } from 'stores/user/userThunks';
import { AppDispatch } from 'stores/store';
import { userStore } from 'stores/user/userSlice';
import { UserState } from 'stores/user/userStateTypes';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';

const useGetUsers = (query: QueryModel<ProfileViewModel>) => {
  const axiosJWT: AxiosInstance = useAxiosJWT();
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: UserState = useSelector(userStore);

  useEffect(() => {
    dispatch(getUsers({ queryData: query, axiosJWT }));
  }, [dispatch, query, axiosJWT]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  }
};

export default useGetUsers;
