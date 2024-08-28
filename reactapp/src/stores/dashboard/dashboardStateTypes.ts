import { RevenueResult } from 'models/DTOs/dashboardModel';
import { StatusState, RecordsState, RecordState } from '../baseStateTypes';

export interface DashboardState extends StatusState {
  dailyRevenue: RevenueResult[];
  monthlyRevenue: RevenueResult[];
  yearlyRevenue: RevenueResult[];
  totalUser: number;
  totalShoppingSession: number;
  totalOrder: number;
  totalRevenue: number;
}

export interface GetRevenuesSuccess extends StatusState, RecordsState<RevenueResult> {}

export interface GetRevenuesFailed {}

export interface GetStaticalSummarySuccess extends StatusState, RecordState<number> {}

export interface GetStaticalSummaryFailed {}
