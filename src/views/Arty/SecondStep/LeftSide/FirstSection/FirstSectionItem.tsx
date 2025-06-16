import { Typography, Divider, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';
import { stringCapitalize } from '/src/utils';

type Props = { value: string; title: string; index: number };

export const FirstSectionItem = ({ title, value, index }: Props) => {
  return (
    <Box sx={{ backgroundColor: '#1E1E1E', borderRadius: '6px', padding: '8px 8px' }}>
      <Typography
        fontFamily={'Poppins'}
        textAlign={'center'}
        color={'#FFFFFF'}
        fontWeight={500}
        fontSize={14}
      >
        {index}. {stringCapitalize(title).replace('_', ' ')}
      </Typography>
      <Divider
        sx={{
          borderColor: Colors.inputBorder,
          borderBottomWidth: '1px',
          width: '100%',
          my: '6px',
        }}
      />
      <Typography fontFamily={'Poppins'} textAlign={'center'} color={'#FFFFFF'} fontSize={12}>
        {value}
      </Typography>
    </Box>
  );
};
