import { Typography, Divider, Box } from '@mui/material';
import React from 'react';

import { SecondSection } from './SecondSection';
import { FirstSection } from './FirstSection';
import { ThirdSection } from './ThirdSection';

import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const LeftSide = () => {
  return (
    <Box
      sx={{
        '@media (max-width: 1024px)': {
          height: 'max-content',
          padding: '8px',
          width: '100%',
        },
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderRadius: '8px',
        display: 'flex',
        padding: '24px',
        height: '100%',
        width: '70%',
      }}
    >
      <Box
        sx={{
          '@media (max-width: 850px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
          display: 'flex',
          gap: '24px',
        }}
      >
        <img
          src="https://artytraders.com/wp-content/uploads/2024/04/Arty-Traders-Logo.png"
          style={{ width: 'max-content', height: '55px' }}
        />
        <Typography
          sx={{
            '@media (max-width: 850px)': {
              textAlign: 'center',
            },
            marginTop: '8px',
          }}
          fontFamily={'Poppins'}
          color={'#4b4b4b'}
          fontSize={18}
        >
          The first artwork prediction tool, providing instant insights into artist, genre, style, and
          estimated value with just an image upload.
        </Typography>
      </Box>
      <Divider
        sx={{
          borderColor: Colors.inputBorder,
          borderBottomWidth: '1px',
          marginTop: '24px',
          width: '100%',
        }}
      />
      <Box
        sx={{
          height: 'calc(100% - 88px)',
          marginTop: '8px',
        }}
      >
        <Box
          sx={{
            ...ScrollBarStylesGenerator('100%'),
            paddingRight: '8px',
            paddingLeft: '4px',
          }}
        >
          {/* <FirstSection />
          <SecondSection /> */}
          <ThirdSection />
        </Box>
      </Box>
    </Box>
  );
};
