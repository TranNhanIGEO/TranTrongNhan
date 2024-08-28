import { useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { AppDispatch } from 'stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardState } from 'stores/dashboard/dashboardStateTypes';
import { dashboardStore } from 'stores/dashboard/dashboardSlice';
import { getYearlyRevenue } from 'stores/dashboard/dashboardThunks';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';

const useGetYearlyRevenues = () => {
    const axiosJWT: AxiosInstance = useAxiosJWT();
    const dispatch: AppDispatch = useDispatch();
    const { yearlyRevenue }: DashboardState = useSelector(dashboardStore);
  
    useEffect(() => {
      dispatch(getYearlyRevenue({ axiosJWT }));
    }, [dispatch, axiosJWT]);
  
    return {
      yearlyRevenue,
    }
};

export default useGetYearlyRevenues;
