/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CircularProgress,
  FormControlLabel,
  Typography,
  RadioGroup,
  TextField,
  Button,
  Radio,
  Box,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from 'react';

import { useArtyContext } from '../../ArtyContext';
import { Loader } from '../../FirstStep/Loader';
import styles from './styles.module.scss';

import { saveFile } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

export const InputTypeFile = () => {
  const {
    setImgFileLoading,
    imgFileLoading,
    imgURLLoading,
    setBase64URL,
    setFilesData,
    filesData,
    setFile,
    file,
  } = useArtyContext();

  const [URL, setURL] = useState('');
  const [email, setEmail] = useState('');
  const [artistName, setArtistName] = useState<string>('');
  const [artworkSize, setArtworkSize] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [artworkName, setArtworkName] = useState('');
  const [ownedBy, setOwnedBy] = useState('yes');
  const [hasError, setHasError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);

  const validateEmail = (email: string) => {
    return email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const handleChangeURL = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setURL(event.target.value);
  };

  const handleChangeYearCreated = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setYear(event.target.value);
  };

  const handleChangeArtistName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleChangeArtworkSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtworkSize(event.target.value);
  };

  const handleChangeArtworkName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setArtworkName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (hasEmailError) {
      setHasEmailError(false);
    }
    setEmail(event.target.value);
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

  const handleChangeOwnedBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwnedBy(event.target.value);
  };

  const handleUploadClick = async () => {
    if (!file && !URL) {
      setHasError(true);
      return;
    }
    if (!validateEmail(email)) {
      setHasEmailError(true);
      return;
    }

    setImgFileLoading(true);
    if (hasError) {
      setHasError(false);
    }
    const formData = new FormData();
    formData.append('data', file);
    formData.append('url', URL);
    formData.append('artistName', artistName);
    formData.append('artWorkSize', artworkSize);
    formData.append('yearCreated', year);
    formData.append('artWorkName', artworkName);
    formData.append('email', email);
    formData.append('ownedByYou', ownedBy);
    try {
      const { data } = await saveFile(formData);
      setFilesData([...filesData, data]);
      setURL(''), setEmail('');
      setArtistName('');
      setArtworkSize('');
      setYear('');
      setArtworkName('');
      setOwnedBy('yes');
    } catch (error) {
      console.error(error);
    } finally {
      setImgFileLoading(false);
    }
  };

  return (
    <div className={(styles.upload_files_container, styles.box_shadow_neutral)}>
      <div style={{ borderColor: URL ? '#484848' : '' }} className={styles.file_area}>
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '55px' }}>
          {imgFileLoading ? (
            <Loader />
          ) : file ? (
            <CheckIcon sx={{ color: '#43a047', height: '50px', width: '50px' }} />
          ) : (
            <FileUploadIcon sx={{ color: URL ? '#484848' : '#c1c1c1', height: '50px', width: '50px' }} />
          )}
        </Box>
        <label className={styles.label}>
          <span className={styles.browse_files}>
            <input
              disabled={imgURLLoading || imgFileLoading || URL}
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
                <span
                  style={{ cursor: URL ? 'default' : 'pointer', color: URL ? '#484848' : '' }}
                  className={styles.browse_files_text}
                >
                  browse image file from device
                </span>
              </div>
            )}
          </span>
        </label>
      </div>
      <div className={styles.error}>
        {hasError && <span className={styles.error_text}>Please select a file or URL first</span>}
      </div>
      <Typography sx={{ mt: '48px', mb: '8px' }} fontWeight={700} fontSize={24}>
        Add URL
      </Typography>
      <Typography fontWeight={400} fontSize={21}>
        Please provide the following data to get more precise Valuation
      </Typography>
      <Typography color={'#DDCDAC'} fontWeight={700} fontSize={24}>
        Or
      </Typography>

      <TextField
        sx={{
          width: '60%',
          mb: '64px',
        }}
        disabled={imgFileLoading || file}
        onChange={handleChangeURL}
        label="Add URL Fields:"
        autoComplete="off"
        size="small"
        value={URL}
      />

      <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', mb: '64px' }}>
        <Box
          sx={{ background: 'linear-gradient(0.25turn, #769C9C, #DDCDAC)', width: '112px', height: '3px' }}
        ></Box>
      </Box>

      <Typography sx={{ mt: '48px', mb: '8px' }} fontWeight={700} fontSize={24}>
        Add Artist Details
      </Typography>
      <Typography sx={{ mb: '24px' }} fontWeight={400} fontSize={21}>
        Please provide the following data to get more precise Valuation
      </Typography>

      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          gap: '16px',
          mb: '24px',
        }}
      >
        <TextField
          sx={{ width: 'calc(30% - 8px) ' }}
          onChange={handleChangeArtistName}
          disabled={imgFileLoading}
          label="Artist Name"
          value={artistName}
          autoComplete="off"
          size="small"
        />
        <TextField
          onChange={handleChangeArtworkSize}
          sx={{ width: 'calc(30% - 8px) ' }}
          disabled={imgFileLoading}
          label="Artwork Size"
          value={artworkSize}
          autoComplete="off"
          size="small"
        />
      </Box>

      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          gap: '16px',
          mb: '64px',
        }}
      >
        <TextField
          sx={{ width: 'calc(30% - 8px) ' }}
          onChange={handleChangeYearCreated}
          disabled={imgFileLoading}
          label="Year Created"
          autoComplete="off"
          value={year}
          size="small"
        />
        <TextField
          onChange={handleChangeArtworkName}
          sx={{ width: 'calc(30% - 8px) ' }}
          disabled={imgFileLoading}
          label="Artwork Name"
          value={artworkName}
          autoComplete="off"
          size="small"
        />
      </Box>
      <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', gap: '10px' }}>
        <TextField
          helperText={hasEmailError && 'A valid email address is required to proceed'}
          sx={{
            width: '30%',
            mb: '64px',
          }}
          onChange={handleChangeEmail}
          disabled={imgFileLoading}
          error={hasEmailError}
          autoComplete="off"
          label="Email"
          value={email}
          size="small"
        />
        <Typography color={'#B0745F'}>*</Typography>
      </Box>

      <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', gap: '10px' }}>
        <Typography fontWeight={500}>Owned by You?</Typography> <Typography color={'#B0745F'}>*</Typography>
      </Box>
      <RadioGroup
        sx={{ display: 'flex', gap: '64px', mb: '56px' }}
        onChange={handleChangeOwnedBy}
        value={ownedBy}
        row
      >
        {[
          {
            value: 'yes',
            label: 'Yes',
          },
          {
            value: 'no',
            label: 'No',
          },
        ].map((option) => {
          return (
            <FormControlLabel
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: '#DDCDAC',
                    },
                  }}
                />
              }
              sx={{
                transition: 'all 0.3s',
                borderRadius: '8px',
                margin: '0px',
                width: '31%',
              }}
              label={option.label}
              value={option.value}
              key={option.label}
            />
          );
        })}
      </RadioGroup>

      <Button
        startIcon={
          imgFileLoading ? (
            <CircularProgress sx={{ color: Colors.placeholderColor }} size={20} />
          ) : (
            <FileUploadIcon />
          )
        }
        sx={{ background: 'linear-gradient(0.25turn, #769C9C, #DDCDAC)', color: 'black' }}
        disabled={imgFileLoading || imgURLLoading}
        onClick={handleUploadClick}
        variant="contained"
        color="primary"
        size="medium"
      >
        Submit
      </Button>
    </div>
  );
};
