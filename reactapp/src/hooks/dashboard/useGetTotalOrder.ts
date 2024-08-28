import { useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { AppDispatch } from 'stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardState } from 'stores/dashboard/dashboardStateTypes';
import { dashboardStore } from 'stores/dashboard/dashboardSlice';
import { getTotalOrder } from 'stores/dashboard/dashboardThunks';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';

const useGetTotalOrder = () => {
    const axiosJWT: AxiosInstance = useAxiosJWT();
    const dispatch: AppDispatch = useDispatch();
    const { totalOrder }: DashboardState = useSelector(dashboardStore);
  
    useEffect(() => {
      dispatch(getTotalOrder({ axiosJWT }));
    }, [dispatch, axiosJWT]);
  
    return {
      totalOrder,
    }
};

export default useGetTotalOrder;
