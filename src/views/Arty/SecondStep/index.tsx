import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

import { useArtyContext } from '../ArtyContext';
import { RightSide } from './RightSide';
import { LeftSide } from './LeftSide';

import { getChartData } from '/src/services/walleService';
import { ScrollBarStylesGenerator } from '/src/utils';

export const SecondStep = () => {
  const { setThirdSectionLoading, setChartData, chartData } = useArtyContext();

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getChartData();
        if (data.x.length !== 0 || data.y.length !== 0) {
          setChartData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    intervalIdRef.current = setInterval(() => {
      if (chartData.x.length !== 0 || chartData.y.length !== 0) {
        clearInterval(intervalIdRef.current);
        setThirdSectionLoading(false);
      } else {
        fetchData();
      }
    }, 500);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [chartData]);

  return (
    <Box
      sx={{
        '@media (max-width: 1024px)': {
          flexDirection: 'column',
          gap: '16px',
          ...ScrollBarStylesGenerator('100%'),
          padding: '24px 16px',
        },
        flexDirection: 'row-reverse',
        padding: '48px',
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: '12px',
      }}
    >
      <RightSide />
      <LeftSide />
    </Box>
  );
};
