import { CircularProgress, Typography, Divider, Box } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WarningIcon from '@mui/icons-material/Warning';
import React, { useEffect, useState } from 'react';

import { TextLoader } from './TextLoader';
import { scoreData } from '../../../data';

import { Colors } from '/src/globalStyles/colors';

type Props = { delay: number; item: string; ind: number };

export const SecondSectionItem = ({ delay, item, ind }: Props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, delay);
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '2px 8px', display: 'flex' }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
          {checked ? (
            // item === 'Website' ? (
            //   <WarningIcon sx={{ color: '#F79324' }} />
            // ) : (
            //   <TaskAltIcon sx={{ color: Colors.successGreen }} />
            // )
            <TaskAltIcon sx={{ color: Colors.successGreen }} />
          ) : (
            <CircularProgress sx={{ color: Colors.successGreen }} size={24} />
          )}
          <Typography fontFamily={'Poppins'} color={'#4b4b4b'} fontWeight={500} fontSize={16}>
            {item}
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: item === 'Website' ? 'flex-end' : 'space-between',
            marginRight: checked ? '0px' : '6px',
            width: checked ? '84px' : '78px',
            alignItems: 'center',
            display: 'flex',
            gap: '8px',
          }}
        >
          {item === 'Website' && checked ? (
            <Typography fontFamily={'Poppins'} color={'#4b4b4b'} fontWeight={500} fontSize={16}>
              Found
            </Typography>
          ) : (
            <>
              <Typography fontFamily={'Poppins'} color={'#4b4b4b'} fontWeight={500} fontSize={16}>
                Score:
              </Typography>
              {checked ? (
                <Typography fontFamily={'Poppins'} color={'#4b4b4b'} fontWeight={500} fontSize={16}>
                  {scoreData[ind]}
                </Typography>
              ) : (
                <TextLoader />
              )}
            </>
          )}
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: Colors.inputBorder,
          borderBottomWidth: '1px',
          width: '100%',
          my: '8px',
        }}
      />
    </Box>
  );
};
