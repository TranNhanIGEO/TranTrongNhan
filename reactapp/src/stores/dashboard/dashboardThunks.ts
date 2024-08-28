import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import DashboardService from 'services/dashboard/dashboardService';
import { GetRevenuesService, GetStatisticalSummaryService } from 'services/dashboard/dashboardServiceTypes';
import { GetRevenuesSuccess, GetStaticalSummarySuccess } from './dashboardStateTypes';

export const getTotalUser = createAsyncThunk<GetStaticalSummarySuccess, GetStatisticalSummaryService>(
  'dashboard/getTotalUser',
  async ({ axiosJWT }: GetStatisticalSummaryService, { rejectWithValue }) => {
    try {
      const { data } = await DashboardService.getTotalUser({ axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const getTotalShoppingSession = createAsyncThunk<GetStaticalSummarySuccess, GetStatisticalSummaryService>(
  'dashboard/getTotalShoppingSession',
  async ({ axiosJWT }: GetStatisticalSummaryService, { rejectWithValue }) => {
    try {
      const { data } = await DashboardService.getTotalShoppingSession({ axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const getTotalOrder = createAsyncThunk<GetStaticalSummarySuccess, GetStatisticalSummaryService>(
  'dashboard/getTotalOrder',
  async ({ axiosJWT }: GetStatisticalSummaryService, { rejectWithValue }) => {
    try {
      const { data } = await DashboardService.getTotalOrder({ axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const getTotalRevenue = createAsyncThunk<GetStaticalSummarySuccess, GetStatisticalSummaryService>(
  'dashboard/getTotalRevenue',
  async ({ axiosJWT }: GetStatisticalSummaryService, { rejectWithValue }) => {
    try {
      const { data } = await DashboardService.getTotalRevenue({ axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const getDailyRevenue = createAsyncThunk<GetRevenuesSuccess, GetRevenuesService>(
  'dashboard/getDailyRevenue',
  async ({ axiosJWT }: GetRevenuesService, { rejectWithValue }) => {
    try {
      const { data } = await DashboardService.getDailyRevenue({ axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const getMonthlyRevenue = createAsyncThunk<GetRevenuesSuccess, GetRevenuesService>(
  'dashboard/getMonthlyRevenue',
  async ({ axiosJWT }: GetRevenuesService, { rejectWithValue }) => {
    try {
      const { data } = await DashboardService.getMonthlyRevenue({ axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);

export const getYearlyRevenue = createAsyncThunk<GetRevenuesSuccess, GetRevenuesService>(
  'dashboard/getYearlyRevenue',
  async ({ axiosJWT }: GetRevenuesService, { rejectWithValue }) => {
    try {
      const { data } = await DashboardService.getYearlyRevenue({ axiosJWT });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        return rejectWithValue(data);
      } else {
        console.log(error);
      }
    }
  },
);
