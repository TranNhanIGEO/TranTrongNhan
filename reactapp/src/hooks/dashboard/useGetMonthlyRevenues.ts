import { useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { AppDispatch } from 'stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardState } from 'stores/dashboard/dashboardStateTypes';
import { dashboardStore } from 'stores/dashboard/dashboardSlice';
import { getMonthlyRevenue } from 'stores/dashboard/dashboardThunks';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';

const useGetMonthlyRevenues = () => {
    const axiosJWT: AxiosInstance = useAxiosJWT();
    const dispatch: AppDispatch = useDispatch();
    const { monthlyRevenue }: DashboardState = useSelector(dashboardStore);
  
    useEffect(() => {
      dispatch(getMonthlyRevenue({ axiosJWT }));
    }, [dispatch, axiosJWT]);
  
    return {
      monthlyRevenue,
    }
};

export default useGetMonthlyRevenues;
