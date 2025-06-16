import { Typography, Box } from '@mui/material';
import React from 'react';

import { AnalyticIcon } from '/src/assets';

type Props = { description: string; title: string };

export const SectionsHeader = ({ description, title }: Props) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        gap: '16px',
      }}
    >
      <Box
        sx={{
          '@media (max-width: 550px)': {
            display: 'none',
          },
          backgroundColor: '#231F20',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          display: 'flex',
          height: '50px',
          width: '50px',
        }}
      >
        <AnalyticIcon />
      </Box>
      <Box>
        <Typography fontFamily={'Poppins'} color={'#231F20'} fontWeight={500} fontSize={20}>
          {title}
        </Typography>
        <Typography fontFamily={'Poppins'} color={'#231F20'} fontWeight={300} fontSize={14}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
