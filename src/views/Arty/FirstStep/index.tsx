import { Typography, Box } from '@mui/material';
import Lottie from 'lottie-react';
import React from 'react';

import { artyAnimation } from './animation';
import { UploadImage } from './UploadImage';

import { Colors } from '/src/globalStyles/colors';

export const FirstStep = () => {
  return (
    <Box
      sx={{
        '@media (max-width: 1024px)': {
          flexDirection: 'column',
          gap: '16px',
        },
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          '@media (max-width: 1024px)': {
            width: '100%',
          },
          backgroundColor: Colors.simulacrumPrimary,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          width: '30%',
        }}
      >
        <Lottie
          style={{
            height: 350,
          }}
          animationData={artyAnimation}
          width={450}
        />
      </Box>
      <Box
        sx={{
          '@media (max-width: 1024px)': {
            width: '100%',
          },
          backgroundColor: '#000000',
          justifyContent: 'center',
          height: 'max-content',
          alignItems: 'center',
          display: 'flex',
          width: '70%',
        }}
      >
        <Box
          sx={{
            '@media (max-width: 1024px)': {
              paddingBottom: '24px',
              paddingTop: '16px',
            },
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <img
            src="https://artytraders.com/wp-content/uploads/2024/04/Arty-Traders-Logo.png"
            style={{ height: '50px' }}
          />
          <Typography
            sx={{
              '@media (max-width: 580px)': {
                width: '340px',
                mb: '8px',
              },
              marginTop: '18px',
              color: 'black',
            }}
            textAlign={'center'}
            fontWeight={600}
            fontSize={18}
          >
            The First Artwork Valuation and Prediction Tool
          </Typography>
          <Typography
            sx={{
              '@media (max-width: 580px)': {
                marginBottom: '16px',
                width: '340px',
              },
              marginBottom: '24px',
              width: '550px',
            }}
            fontFamily={'Poppins'}
            textAlign={'center'}
            color={'#4b4b4b'}
            fontWeight={300}
            fontSize={16}
          >
            Instantly analyze artwork structure and estimate its value with a simple image upload.
          </Typography>
          <UploadImage />
        </Box>
      </Box>
    </Box>
  );
};
