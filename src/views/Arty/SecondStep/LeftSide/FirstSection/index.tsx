import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

import { noneVisibleValues, visibleValues, delays } from '../../../data';
import { FirstSectionItem } from './FirstSectionItem';
import { useArtyContext } from '../../../ArtyContext';
import { SectionsHeader } from '../SectionsHeader';
import { Loader } from './Loader';

export const FirstSection = () => {
  const { imageAnalyticsData } = useArtyContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, delays.step1);
  }, []);

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
        description={'Analyze similarities across 150 categories for 12,453,754 artworks.'}
        title={'Result of Image Processing'}
      />
      {isLoading ? (
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '320px',
            display: 'flex',
            width: '100%',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              '@media (max-width: 850px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
              },
              '@media (max-width: 550px)': {
                gridTemplateColumns: 'repeat(1, 1fr)',
              },
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gridColumnGap: '8px',
              position: 'relative',
              gridRowGap: '8px',
              display: 'grid',
              mt: '24px',
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
            {visibleValues.map((item, index) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              return (
                <FirstSectionItem
                  value={imageAnalyticsData[item]}
                  index={index + 1}
                  title={item}
                  key={index}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              '@media (max-width: 850px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
              },
              '@media (max-width: 550px)': {
                gridTemplateColumns: 'repeat(1, 1fr)',
              },
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gridColumnGap: '8px',
              position: 'relative',
              gridRowGap: '8px',
              display: 'grid',
              mt: '8px',
            }}
          >
            <Box
              sx={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0)',
                backdropFilter: 'blur(4px)',
                height: 'calc(100% + 8px)',
                background: 'transparent',
                width: 'calc(100% + 8px)',
                position: 'absolute',
                borderRadius: '6px',
                right: '-4px',
                top: '-4px',
              }}
            ></Box>
            <Box
              sx={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0)',
                transform: 'translate(-50%,-50%)',
                border: '1px solid #ffffff42',
                backdropFilter: 'blur(2px)',
                justifyContent: 'center',
                background: '#292929d4',
                flexDirection: 'column',
                position: 'absolute',
                alignItems: 'center',
                borderRadius: '6px',
                padding: '8px 24px',
                display: 'flex',
                width: '280px',
                left: '50%',
                zIndex: '1',
                gap: '8px',
                top: '50%',
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
                All 150 options are private
              </Typography>
            </Box>
            {noneVisibleValues.map((item, index) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              return (
                <FirstSectionItem
                  value={imageAnalyticsData[item]}
                  index={index + 9}
                  title={item}
                  key={index}
                />
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};
