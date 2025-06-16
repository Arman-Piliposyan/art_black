import { LineChart } from '@mui/x-charts/LineChart';
import { format } from 'date-fns';
import React from 'react';

import { useArtyContext } from '../../../ArtyContext';

import { Colors } from '/src/globalStyles/colors';

export const LineChartSection = () => {
  const { chartData } = useArtyContext();
  const xLabels = chartData.x.map((item: string) => {
    return format(new Date(item), 'yyyy');
  });

  return (
    <LineChart
      series={[
        {
          data: chartData.minPrices,
          color: '#0652DD',
          label: 'Minimum',
          showMark: false,
          area: false,
          id: 'min',
        },
        {
          data: chartData.optimalPrices,
          color: '#789c7e',
          label: 'Optimum',
          showMark: false,
          id: 'optimal',
          area: false,
        },
        {
          data: chartData.maxPrices,
          label: 'Maximum',
          color: '#5f27cd',
          showMark: false,
          area: false,
          id: 'max',
        },
      ]}
      sx={{
        '& .MuiAreaElement-series-Conversations': {
          fill: Colors.simulacrumPrimary,
        },
        width: '100%',
      }}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      grid={{ horizontal: true, vertical: true }}
      height={290}
    />
  );
};
