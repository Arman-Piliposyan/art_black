import { Box } from '@mui/material';
import React from 'react';

import { useArtyContext } from '../../ArtyContext';
import { ProcessingItem } from './ProcessingItem';
import { ProcessingItemsData } from '../../data';

import { ScrollBarStylesGenerator } from '/src/utils';

export const RightSide = () => {
  const { base64URL, imgURL } = useArtyContext();

  return (
    <Box
      sx={{
        '@media (max-width: 1024px)': {
          paddingRight: '0px',
          width: '100%',
        },
        backgroundColor: '#FFFFFF',
        paddingRight: '8px',
        borderRadius: '8px',
        width: '30%',
        py: '8px',
      }}
    >
      <Box
        sx={{
          ...ScrollBarStylesGenerator('100%'),
          padding: '0px',
        }}
      >
        <Box
          sx={{
            '@media (max-width: 1024px)': {
              alignItems: 'flex-start',
              flexDirection: 'row',
              gap: '16px',
            },
            '@media (max-width: 650px)': {
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            },
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            padding: '12px',
          }}
        >
          <img style={{ borderRadius: '6px' }} src={base64URL || imgURL} className="uploadImg" />
          <Box
            sx={{
              '@media (max-width: 1024px)': {
                width: '50%',
                mt: '0px',
              },
              '@media (max-width: 650px)': {
                width: '100%',
              },
              flexDirection: 'column',
              display: 'flex',
              width: '100%',
              gap: '8px',
              mt: '24px',
            }}
          >
            {ProcessingItemsData.map((item, index) => {
              return <ProcessingItem item={item} key={index} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
