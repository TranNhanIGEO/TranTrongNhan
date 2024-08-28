import { Options, SeriesOptionsType } from 'highcharts';
import { useMemo } from 'react';
import { ChartTypes } from '../types/RevenueChart';

interface UseHighChartProps {
    chartType?: ChartTypes, 
    series?: SeriesOptionsType[], 
    categories?: string[], 
    chartTitle?: string, 
    yAxisTitle?: string
}

const useHighCharts = ({chartType, series, categories, chartTitle, yAxisTitle}: UseHighChartProps) => {
  const options: Options = useMemo(() => {
    return {
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
        style: {
          color: '#2C2C2C',
          fontWeight: 'bold',
          fontSize: '1.4rem',
          fontFamily: 'Inter',
        },
      },
      subtitle: {
        text: '',
        style: {
          color: '#2C2C2C',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          fontFamily: 'Inter',
        },
      },
      xAxis: {
        categories: categories,
        crosshair: true,
        labels: {
          style: {
            color: '#000000',
            fontWeight: 'normal',
            fontSize: '1rem',
            fontFamily: 'Inter',
          },
        },
      },
      yAxis: {
        title: {
          text: yAxisTitle,
          style: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            fontFamily: 'Inter',
          },
        },
        labels: {
          style: {
            color: '#000000',
            fontWeight: 'normal',
            fontSize: '1rem',
            fontFamily: 'Inter',
          },
        },
      },
      series: series,
      tooltip: {
        hideDelay: 150,
        style: {
          color: '#0A5064',
          fontWeight: 'normal',
          fontSize: '1.2rem',
          fontFamily: 'Inter',
        },
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#000000',
          fontWeight: 'normal',
          fontSize: '1rem',
          fontFamily: 'Inter',
        },
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        enabled: false,
      },
      lang: {
        noData: 'Loading...',
      },
      noData: {
        style: {
          color: '#000000',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          fontFamily: 'Inter',
        },
      },
    };
  }, [chartType, series, categories, chartTitle, yAxisTitle]);

  return { options };
};

export default useHighCharts;
