import { useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { AppDispatch } from 'stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardState } from 'stores/dashboard/dashboardStateTypes';
import { dashboardStore } from 'stores/dashboard/dashboardSlice';
import { getDailyRevenue } from 'stores/dashboard/dashboardThunks';
import useAxiosJWT from 'hooks/auth/useAxiosJWT';

const useGetDailyRevenues = () => {
    const axiosJWT: AxiosInstance = useAxiosJWT();
    const dispatch: AppDispatch = useDispatch();
    const { dailyRevenue }: DashboardState = useSelector(dashboardStore);
  
    useEffect(() => {
      dispatch(getDailyRevenue({ axiosJWT }));
    }, [dispatch, axiosJWT]);
  
    return {
      dailyRevenue,
    }
};

export default useGetDailyRevenues;
