import { CircularProgress, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

export const LayoutLoader = ({ backgroundColor }: { backgroundColor?: string }) => {
  const loadingContainerStyles = {
    backgroundColor: backgroundColor || Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    display: 'flex',
  };
  return (
    <Box sx={loadingContainerStyles}>
      <CircularProgress sx={{ color: Colors.white }} size={30} />
    </Box>
  );
};
