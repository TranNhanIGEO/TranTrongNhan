import { useMemo } from 'react';
import { RevenueResult } from 'models/DTOs/dashboardModel';
import { SeriesOptionsType } from 'highcharts';
import { ChartTypes } from '../types/RevenueChart';

const useRevenueChartData = (chartType: ChartTypes, data: RevenueResult[]) => {
  const categories = useMemo(() => {
    return data.map(item =>
      !!item.orderDate
        ? new Date(item.orderDate).toLocaleDateString()
        : !!item.orderMonth
        ? `${item.orderMonth}/${item.orderYear}`
        : `${item.orderYear}`,
    );
  }, [data]);

  const series: SeriesOptionsType[] = useMemo(() => {
    return [{
      type: chartType,
      name: "Revenue",
      data: data.map(item => item.revenue),
    }];
  }, [data, chartType]);

  return {
    categories,
    series,
  };
};

export default useRevenueChartData;
