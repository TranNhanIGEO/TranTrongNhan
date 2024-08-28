import { useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { AppDispatch } from 'stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardState } from 'stores/dashboard/dashboardStateTypes';
import { dashboardStore } from 'stores/dashboard/dashboardSlice';
import { getTotalRevenue } from 'stores/dashboard/dashboardThunks';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';

const useGetTotalRevenue = () => {
    const axiosJWT: AxiosInstance = useAxiosJWT();
    const dispatch: AppDispatch = useDispatch();
    const { totalRevenue }: DashboardState = useSelector(dashboardStore);
  
    useEffect(() => {
      dispatch(getTotalRevenue({ axiosJWT }));
    }, [dispatch, axiosJWT]);
  
    return {
      totalRevenue,
    }
};

export default useGetTotalRevenue;
