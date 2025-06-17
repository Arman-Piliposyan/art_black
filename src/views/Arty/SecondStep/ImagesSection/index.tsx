import { Typography, Box } from '@mui/material';
import React from 'react';

import { SingleImageItem } from './SingleImageItem';
import { useArtyContext } from '../../ArtyContext';

export type ChartDataType = {
  optimalPrices: number[];
  minPrices: number[];
  maxPrices: number[];
  x: string[];
};

export type FileDataType = {
  chartData: ChartDataType;
  valuationId: string;
  processing: boolean;
  digitalRate: number;
  artwork: string;
  date: string;
  id: number;
};

export const ImagesSection = () => {
  const { filesData } = useArtyContext();

  return (
    <>
      {filesData ? (
        <Box
          sx={{
            border: '1px solid white',
            flexDirection: 'column',
            height: 'max-content',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            p: '64px',
          }}
        >
          <Box
            sx={{
              borderRadius: '24px 24px 0 0',
              alignItems: 'center',
              display: 'flex',
              height: '48px',
              width: '100%',
            }}
          >
            <Typography sx={{ width: '20%', pl: '16px' }} fontWeight={500} fontSize={14}>
              ARTWORK
            </Typography>
            <Typography sx={{ width: '20%' }} fontWeight={500} fontSize={14}>
              VALUATION ID
            </Typography>
            <Typography sx={{ width: '20%' }} fontWeight={500} fontSize={14}>
              DATE
            </Typography>
            <Typography sx={{ width: '20%' }} fontWeight={500} fontSize={14}>
              DIGITAL RATE
            </Typography>
          </Box>
          {filesData.map((file: FileDataType, index: number) => {
            return <SingleImageItem key={file.id} index={index} file={file} />;
          })}
        </Box>
      ) : null}
    </>
  );
};
