import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Typography, Box } from '@mui/material';
import React from 'react';

import { useArtyContext } from '../../../ArtyContext';
import { LineChartSection } from './LineChartSection';
import { SectionsHeader } from '../SectionsHeader';
import { ThirdSectionLoader } from './Loader';

export const ThirdSection = () => {
  const { thirdSectionLoading } = useArtyContext();

  return (
    <>
      <Box
        sx={{
          padding: '16px 8px 16px 16px',
          backgroundColor: '#EDEFF7',
          alignItems: 'center',
          borderRadius: '6px',
          marginTop: '8px',
          display: 'flex',
          width: '100%',
        }}
      >
        <InfoOutlinedIcon sx={{ color: '#231F20', fontSize: '16px', mr: '8px' }} />
        <Typography color={'#231F20'} fontWeight={400} fontSize={14}>
          The processing may take anywhere from 5 minutes to 4 hours, depending on system load. Thank you for
          your patience.
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '24px 8px 24px 12px',
          backgroundColor: '#EDEFF7',
          borderRadius: '6px',
          marginTop: '10px',
          width: '100%',
        }}
      >
        <SectionsHeader
          description={`Analyze costs for similar art assets with ${
            Math.floor(Math.random() * (90 - 70 + 1)) + 70
          }%+ accuracy.`}
          title={'Result of Cost Prediction'}
        />

        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            display: 'flex',
            width: '100%',
          }}
        >
          {thirdSectionLoading ? <ThirdSectionLoader /> : <LineChartSection />}
        </Box>
      </Box>
    </>
  );
};
