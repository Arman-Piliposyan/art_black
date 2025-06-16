import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';

import { searchAnimation } from './animation';
import { delays } from '../../../data';

import { SearchImage } from '/src/assets';

export const SearchAnimationWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, delays.step1 + 15 * delays.step2);
  }, []);

  return (
    <Box
      sx={{
        '@media (max-width: 750px)': {
          '& svg': {
            marginLeft: isLoading ? '' : '-110px',
            width: '100%',
          },
          height: 'max-content',
          width: '100%',
        },
        justifyContent: 'center',
        alignItems: 'center',
        height: '320px',
        display: 'flex',
        width: '55%',
      }}
    >
      {isLoading ? (
        <Lottie
          style={{
            height: 320,
          }}
          animationData={searchAnimation}
          width={450}
        />
      ) : (
        <SearchImage />
      )}
    </Box>
  );
};
