import { CircularProgress, Typography, Box } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import React, { useEffect, useState } from 'react';

import { useArtyContext } from '../../ArtyContext';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  item: { isChecked: boolean; title: string; delay: number };
};

export const ProcessingItem = ({ item }: Props) => {
  const { thirdSectionLoading } = useArtyContext();
  const { isChecked, title, delay } = item;
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    if (item.title === 'Predicting Cost') {
      return;
    }
    setTimeout(() => {
      setChecked(true);
    }, delay);
  }, []);

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        backgroundColor: '#EDEFF7',
        padding: '18px 24px',
        borderRadius: '6px',
        display: 'flex',
        width: '100%',
      }}
    >
      <Typography fontFamily={'Poppins'} color={'#4b4b4b'} fontSize={16}>
        {title}
      </Typography>
      {item.title === 'Predicting Cost' ? (
        thirdSectionLoading ? (
          <CircularProgress sx={{ color: Colors.successGreen }} size={24} />
        ) : (
          <TaskAltIcon sx={{ color: Colors.successGreen }} />
        )
      ) : checked ? (
        <TaskAltIcon sx={{ color: Colors.successGreen }} />
      ) : (
        <CircularProgress sx={{ color: Colors.successGreen }} size={24} />
      )}
    </Box>
  );
};
