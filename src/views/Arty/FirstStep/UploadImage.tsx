import { CircularProgress, Typography, TextField, Button, Box } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import React from 'react';

import { InputTypeFile } from './InputTypeFile';
import { useArtyContext } from '../ArtyContext';

import { saveImgUrl } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

export const UploadImage = () => {
  const {
    setImageAnalyticsData,
    setImgURLLoading,
    setShowFirstPage,
    imgFileLoading,
    imgURLLoading,
    setImgURL,
    imgURL,
  } = useArtyContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgURL(event.target.value);
  };

  const handleSaveImgUrl = async () => {
    try {
      setImgURLLoading(true);
      const { data } = await saveImgUrl({ image_url: imgURL });
      setImageAnalyticsData(data);
      setShowFirstPage(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setImgURLLoading(false);
    }
  };
  return (
    <Box
      sx={{
        '@media (max-width: 1024px)': {
          // boxShadow: 'none',
        },
        boxShadow: `0px 0px 15px 0px ${Colors.simulacrumPrimary + 50}`,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '12px',
        display: 'flex',
        padding: '16px',
      }}
    >
      {/* <Box
        sx={{
          justifyContent: 'space-between',
          borderRadius: '20px',
          display: 'flex',
          width: '100%',
          gap: '8px',
        }}
      >
        <TextField
          onChange={handleInputChange}
          sx={{ width: '78%' }}
          label="Image url"
          value={imgURL}
          size="small"
        />
        <Button
          startIcon={
            imgURLLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <AutoGraphIcon />
          }
          disabled={!imgURL || imgURLLoading || imgFileLoading}
          onClick={handleSaveImgUrl}
          variant="contained"
          size="small"
        >
          Analyze
        </Button>
      </Box>
      <Typography sx={{ my: '16px' }} fontWeight={500} fontSize={16}>
        OR
      </Typography> */}
      <InputTypeFile />
    </Box>
  );
};
