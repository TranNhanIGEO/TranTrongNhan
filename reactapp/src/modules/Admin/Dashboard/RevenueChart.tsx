import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { RevenueChartProps } from './types/RevenueChart';
import useHighCharts from './hooks/useHighCharts';
import useRevenueChartData from './hooks/useRevenueChartData';

const RevenueChart: FC<RevenueChartProps> = ({ chartTitle, chartType, data }) => {
  const yAxisTitle = "Revenue (VNĐ)";
  const { categories, series } = useRevenueChartData(chartType, data);
  const { options } = useHighCharts({ categories, series, chartTitle, chartType, yAxisTitle });

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RevenueChart;
