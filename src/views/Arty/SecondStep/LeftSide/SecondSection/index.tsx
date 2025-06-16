import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography, Box } from '@mui/material';
import React from 'react';

import { SearchAnimationWrapper } from './SearchAnimationWrapper';
import { SecondSectionItem } from './SecondSectionItem';
import { SectionsHeader } from '../SectionsHeader';
import { eventsData, delays } from '../../../data';

export const SecondSection = () => {
  return (
    <Box
      sx={{
        padding: '24px 8px 24px 12px',
        backgroundColor: '#EDEFF7',
        borderRadius: '6px',
        marginTop: '32px',
        width: '100%',
      }}
    >
      <SectionsHeader
        description={'Scrape all public and off-market information for the artist.'}
        title={'Result of Event Analyzing'}
      />
      <Box
        sx={{
          '@media (max-width: 750px)': {
            flexDirection: 'column-reverse',
            height: 'max-content',
          },
          justifyContent: 'center',
          alignItems: 'center',
          height: '320px',
          display: 'flex',
          width: '100%',
          gap: '48px',
          mt: '24px',
        }}
      >
        <Box
          sx={{
            '@media (max-width: 750px)': {
              height: 'max-content',
              width: '95%',
            },
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            height: '320px',
            display: 'flex',
            width: '45%',
          }}
        >
          <Box
            sx={{
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0)',
              // backdropFilter: 'blur(4px)',
              height: 'calc(100% + 8px)',
              background: 'transparent',
              width: 'calc(100% + 8px)',
              position: 'absolute',
              borderRadius: '6px',
              right: '-4px',
              top: '-4px',
            }}
          ></Box>
          {eventsData.map((item, index) => {
            return (
              <SecondSectionItem
                delay={delays.step1 + (index + 1) * delays.step2}
                ind={index}
                item={item}
                key={index}
              />
            );
          })}
          <Box
            sx={{
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0)',
              border: '1px solid #ffffff42',
              backdropFilter: 'blur(2px)',
              justifyContent: 'center',
              background: '#292929d4',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '6px',
              padding: '8px 24px',
              display: 'flex',
              width: '100%',
              gap: '8px',
              mt: '8px',
            }}
          >
            <LockOutlinedIcon sx={{ color: '#F79324', fontSize: '32px' }} />
            <Typography
              fontFamily={'Poppins'}
              textAlign={'center'}
              color={'#FFFFFF'}
              fontWeight={300}
              fontSize={12}
            >
              All 52 options are private
            </Typography>
          </Box>
        </Box>
        <SearchAnimationWrapper />
      </Box>
    </Box>
  );
};
