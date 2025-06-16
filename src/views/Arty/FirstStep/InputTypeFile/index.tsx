/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CircularProgress, Typography, TextField, MenuItem, Button, Box } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

import { useArtyContext } from '../../ArtyContext';
import styles from './styles.module.scss';
import { Loader } from '../Loader';

import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { SubmitImgFile, saveImgFile } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

export const InputTypeFile = () => {
  const {
    setImageAnalyticsData,
    setImgFileLoading,
    setShowFirstPage,
    imgFileLoading,
    imgURLLoading,
    setBase64URL,
    setFile,
    file,
  } = useArtyContext();

  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState('inch');
  const [artworkHeight, setArtworkHeight] = useState<string | number>('');
  const [artworkWidth, setArtworkWidth] = useState<string | number>('');
  const [artistName, setArtistName] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const validateEmail = (email: string) => {
    return email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (hasEmailError) {
      setHasEmailError(false);
    }
    setEmail(event.target.value);
  };

  const handleChangeUnit = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const handleChangeArtworkHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtworkHeight(Number(event.target.value) < 0 ? 0 : event.target.value);
  };

  const handleChangeArtworkWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtworkWidth(Number(event.target.value) < 0 ? 0 : event.target.value);
  };

  const handleChangeArtistName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  //@ts-ignore
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  //@ts-ignore
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setHasError(false);
    getBase64(file)
      .then((result) => {
        file['base64'] = result;
        setBase64URL(result as string);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUploadClick = async () => {
    if (!file) {
      setHasError(true);
      return;
    }
    if (!validateEmail(email)) {
      setHasEmailError(true);
      return;
    }
    if (!email) {
      setHasEmailError(true);
      return;
    }
    setImgFileLoading(true);
    if (hasError) {
      setHasError(false);
    }
    if (hasEmailError) {
      setHasEmailError(false);
    }
    const formData = new FormData();
    formData.append('data', file);
    formData.append(
      'artworkSize',
      'H' + (artworkHeight || 0) + ' X ' + 'W' + (artworkWidth || 0) + ' ' + unit,
    );
    formData.append('artistName', artistName);
    formData.append('email', email);
    try {
      await saveImgFile(formData);
      await SubmitImgFile(formData);
      // setOpenInfoModal(true);
      // setImageAnalyticsData(data),
      setShowFirstPage(false);
    } catch (error) {
      console.error(error);
    } finally {
      setImgFileLoading(false);
    }
  };

  useEffect(() => {
    if (openInfoModal) {
      return;
    }
    setFile(null);
    setEmail('');
    setArtistName('');
    setUnit('inch');
    setArtworkHeight('');
    setArtworkWidth('');
  }, [openInfoModal]);

  return (
    <>
      <div className={(styles.upload_files_container, styles.box_shadow_neutral)}>
        <div className={styles.file_area}>
          <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '55px' }}>
            {imgFileLoading ? (
              <Loader />
            ) : file ? (
              <CheckIcon sx={{ color: '#43a047', height: '50px', width: '50px' }} />
            ) : (
              <FileUploadIcon sx={{ height: '50px', width: '50px' }} />
            )}
          </Box>
          <label className={styles.label}>
            <span className={styles.browse_files}>
              <input
                disabled={imgURLLoading || imgFileLoading}
                className={styles.default_file_input}
                style={{ display: file && 'none' }}
                onChange={handleFileInputChange}
                accept=".png,.jpg"
                type="file"
              />
              {file ? (
                <div className={styles.files_name}>{file && `${file.name}`}</div>
              ) : (
                <div style={{ height: !file ? '0px' : '', display: 'flex', gap: '6px' }}>
                  <span className={styles.browse_files_text}>browse image file </span>
                  <span>from device</span>
                </div>
              )}
            </span>
          </label>
        </div>
        <div className={styles.error}>
          {hasError && <span className={styles.error_text}>Please select a file first</span>}
        </div>
        <Typography
          sx={{
            '@media (max-width: 580px)': {
              marginBottom: '20px',
              width: '320px',
            },
            marginBottom: '16px',
            width: '550px',
          }}
          fontFamily={'Poppins'}
          textAlign={'center'}
          color={'#4b4b4b'}
          fontWeight={300}
          fontSize={16}
        >
          As this is a test environment, the analysis may take some time. Please provide your email address to
          receive the results.
        </Typography>

        <TextField
          sx={{
            '& > p': {
              position: 'absolute',
              top: '36px',
              pl: '8px',
            },
            width: '100%',
            mb: '24px',
          }}
          helperText={hasEmailError && 'A valid email address is required to proceed'}
          onChange={handleChangeEmail}
          disabled={imgFileLoading}
          error={hasEmailError}
          autoComplete="off"
          label="Email*"
          value={email}
          type="email"
          size="small"
        />
        <Box sx={{ alignItems: 'center', display: 'flex', width: '100%^', gap: '6px', mb: '24px' }}>
          <TextField
            onChange={handleChangeArtworkHeight}
            disabled={imgFileLoading}
            sx={{ width: '35%' }}
            value={artworkHeight}
            autoComplete="off"
            label="Height"
            type="number"
            size="small"
          />
          <Typography fontWeight={700}>X</Typography>
          <TextField
            onChange={handleChangeArtworkWidth}
            disabled={imgFileLoading}
            sx={{ width: '35%' }}
            value={artworkWidth}
            autoComplete="off"
            type="number"
            label="Width"
            size="small"
          />

          <TextField
            sx={{
              width: '30%',
              ml: '12px',
            }}
            onChange={handleChangeUnit}
            disabled={imgFileLoading}
            size="small"
            value={unit}
            select
          >
            <MenuItem value={'inch'}>inch</MenuItem>
            <MenuItem value={'cm'}>cm</MenuItem>
          </TextField>
        </Box>
        <TextField
          sx={{ width: '100%', mb: '24px' }}
          onChange={handleChangeArtistName}
          disabled={imgFileLoading}
          label="Artist name"
          autoComplete="off"
          value={artistName}
          size="small"
        />

        <Button
          startIcon={
            imgFileLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <FileUploadIcon />
          }
          disabled={imgFileLoading || imgURLLoading}
          onClick={handleUploadClick}
          variant="contained"
          color="primary"
          size="medium"
        >
          Submit
        </Button>
      </div>
      <CommonModal
        modalContent={
          <Box sx={{ flexDirection: 'column', alignItems: 'center', display: 'flex', gap: '16px' }}>
            <CheckIcon sx={{ color: Colors.successGreen, height: '50px', width: '50px' }} />

            <Typography textAlign={'center'}>
              Thank you! As a startup, we’re giving you access to our internal tool, which may take some time
              to process your request. Instead of waiting in front of your computer, we’ll email you the
              results within 15 minutes to 4 hours.
            </Typography>
          </Box>
        }
        setOpenModal={setOpenInfoModal}
        open={openInfoModal}
        // width="350px"
      />
    </>
  );
};
