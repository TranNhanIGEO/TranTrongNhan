import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DashboardState, GetRevenuesSuccess, GetStaticalSummarySuccess } from './dashboardStateTypes';
import { getDailyRevenue, getMonthlyRevenue, getTotalOrder, getTotalRevenue, getTotalShoppingSession, getTotalUser, getYearlyRevenue } from './dashboardThunks';

const initState: DashboardState = {
  isLoading: false,
  isSuccess: false,
  dailyRevenue: [],
  monthlyRevenue: [],
  yearlyRevenue: [],
  totalUser: 0,
  totalShoppingSession: 0,
  totalOrder: 0,
  totalRevenue: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    // Get total user
    builder.addCase(getTotalUser.pending, (state: DashboardState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getTotalUser.fulfilled, (state: DashboardState, action: PayloadAction<GetStaticalSummarySuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.totalUser = record;
    });
    builder.addCase(getTotalUser.rejected, (state: DashboardState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get total shopping session
    builder.addCase(getTotalShoppingSession.pending, (state: DashboardState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getTotalShoppingSession.fulfilled, (state: DashboardState, action: PayloadAction<GetStaticalSummarySuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.totalShoppingSession = record;
    });
    builder.addCase(getTotalShoppingSession.rejected, (state: DashboardState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get total order
    builder.addCase(getTotalOrder.pending, (state: DashboardState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getTotalOrder.fulfilled, (state: DashboardState, action: PayloadAction<GetStaticalSummarySuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.totalOrder = record;
    });
    builder.addCase(getTotalOrder.rejected, (state: DashboardState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get total revenue
    builder.addCase(getTotalRevenue.pending, (state: DashboardState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getTotalRevenue.fulfilled, (state: DashboardState, action: PayloadAction<GetStaticalSummarySuccess>) => {
      const { record } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.totalRevenue = record;
    });
    builder.addCase(getTotalRevenue.rejected, (state: DashboardState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get daily revenue
    builder.addCase(getDailyRevenue.pending, (state: DashboardState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getDailyRevenue.fulfilled, (state: DashboardState, action: PayloadAction<GetRevenuesSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.dailyRevenue = records;
    });
    builder.addCase(getDailyRevenue.rejected, (state: DashboardState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get monthly revenue
    builder.addCase(getMonthlyRevenue.pending, (state: DashboardState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getMonthlyRevenue.fulfilled, (state: DashboardState, action: PayloadAction<GetRevenuesSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.monthlyRevenue = records;
    });
    builder.addCase(getMonthlyRevenue.rejected, (state: DashboardState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
    // Get yearly revenue
    builder.addCase(getYearlyRevenue.pending, (state: DashboardState) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getYearlyRevenue.fulfilled, (state: DashboardState, action: PayloadAction<GetRevenuesSuccess>) => {
      const { records } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.yearlyRevenue = records;
    });
    builder.addCase(getYearlyRevenue.rejected, (state: DashboardState) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export const dashboardStore = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
