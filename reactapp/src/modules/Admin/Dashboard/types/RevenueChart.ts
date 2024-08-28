import { LINE_CHART, COLUMN_CHART, AREA_CHART } from 'constants/chart';
import { RevenueResult } from "models/DTOs/dashboardModel";

export type ChartTypes = 
  | typeof LINE_CHART 
  | typeof COLUMN_CHART 
  | typeof AREA_CHART;

export interface RevenueChartProps {
  chartTitle: string
  chartType: ChartTypes;
  data: RevenueResult[];
}
