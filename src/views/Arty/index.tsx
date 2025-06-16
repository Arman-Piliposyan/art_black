import { Box } from '@mui/material';
import React from 'react';

import { useArtyContext } from './ArtyContext';
import { SecondStep } from './SecondStep';
import { FirstStep } from './FirstStep';

export const Arty = () => {
  const { showFirstPage } = useArtyContext();
  return (
    <Box
      sx={{
        backgroundColor: '#EDEFF7',
        height: '100vh',
        width: '100%',
      }}
    >
      {showFirstPage ? <FirstStep /> : <SecondStep />}
    </Box>
  );
};
