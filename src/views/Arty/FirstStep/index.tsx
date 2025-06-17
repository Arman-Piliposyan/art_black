import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import * as yup from 'yup';

import artyBg from './../../../assets/images/arty_bg.png';
import { useArtyContext } from '../ArtyContext';
import { artyAnimation } from './animation';

import { TextFieldController } from '/src/common/components/UI-Components/TextFieldController';
import { AddeparLogo, ArtyLogo, Addepar } from '/src/assets';
import { Colors } from '/src/globalStyles/colors';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Please type a valid email address.').required('Required'),
  password: yup.string().required('Required'),
});

export const AlternativeButtonWithBorderStyles = {
  '&:hover': {
    '& svg': {
      transition: 'all 0.3s',
      fill: 'white',
    },
    backgroundColor: Colors.simulacrumPrimary,
    border: `1px solid ${Colors.white}`,
    color: Colors.white,
  },
  '&.Mui-disabled': {
    border: `1px solid ${Colors.placeholderColor}`,
    color: Colors.placeholderColor,
    backgroundColor: Colors.white,
  },
  border: `1px solid ${Colors.simulacrumPrimary}`,
  color: Colors.simulacrumPrimary,
  backgroundColor: Colors.white,
  width: 'max-content',
  borderRadius: '4px',
};

interface IFormInputs {
  password: string;
  email: string;
}

export const FirstStep = () => {
  const { setShowFirstPage, setUserData } = useArtyContext();

  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(LoginSchema),
    mode: 'onSubmit',
  });

  const signInClick = async (loginData: IFormInputs): Promise<void> => {
    if (loginData.email !== 'addepar@artytraders.com' && loginData.password !== 'VPAP25addepar!') {
      setError('email', { message: 'Wrong email', type: 'invalid' });
      return;
    }
    setIsLoading(true);
    const requestData = {
      password: loginData.password,
      email: loginData.email,
    };
    try {
      setUserData(requestData);
      setTimeout(() => {
        localStorage.setItem('email', loginData.email);
        setIsLoading(false);
        setShowFirstPage(false);
      }, 1800);
    } catch (error) {
      setIsLoading(false);
      const { data } = error.response;
      if (data.message) {
        setError('email', { message: data.message, type: 'invalid' });
      }
    }
  };

  return (
    <Box
      sx={{
        '@media (max-width: 1024px)': {
          flexDirection: 'column',
          gap: '16px',
        },
        backgroundImage: `url(${artyBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: 'black',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        display: 'flex',
        height: '100vh',
        width: '100%',
      }}
    >
      <Box sx={{ height: '120px', width: '100%', pt: '56px', pl: '56px' }}>
        <ArtyLogo />
      </Box>
      <Box sx={{ height: 'calc(100% - 120px)', display: 'flex', width: '100%' }}>
        <Box
          sx={{
            '@media (max-width: 1024px)': {
              display: 'none',
            },
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            width: '30%',
          }}
        >
          <Lottie
            style={{
              height: 450,
            }}
            animationData={artyAnimation}
            width={500}
          />
        </Box>
        <Box
          sx={{
            '@media (max-width: 1024px)': {
              width: '100%',
            },
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            width: '70%',
          }}
        >
          <Box
            sx={{
              '@media (max-width: 1024px)': {
                paddingBottom: '24px',
                paddingTop: '16px',
              },
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              display: 'flex',
              width: '100%',
            }}
          >
            <Box
              sx={{
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                display: 'flex',
                width: '70%',
                mb: '82px',
              }}
            >
              <Box sx={{ flexDirection: 'column', display: 'flex', gap: '14px' }}>
                <Typography color={'#FFFFFF'} fontWeight={700}>
                  LOGIN
                </Typography>
                <Box sx={{ backgroundColor: 'white', width: '100px', height: '3px' }}></Box>
              </Box>
              <Box
                sx={{
                  '@media (max-width: 1024px)': {
                    display: 'none',
                  },
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <Addepar />
                <Typography color={'#FFFFFF'} fontWeight={900} fontSize={21}>
                  PARTNER ENVIRONMENT
                </Typography>
              </Box>
              <Box
                sx={{
                  '@media (max-width: 1024px)': {
                    display: 'block',
                  },
                  display: 'none',
                }}
              >
                <AddeparLogo />
              </Box>
            </Box>
            <TextFieldController
              sx={{ width: '70%', mb: '16px' }}
              fieldName="email"
              control={control}
              autofill={false}
              label="Email*"
            />
            <TextFieldController
              sx={{ width: '70%', mb: '34px' }}
              passwordIconColor="primary"
              fieldName="password"
              control={control}
              label="Password*"
              autofill={false}
              type="password"
            />
            <Box sx={{ display: 'flex', width: '70%' }}>
              <Button
                startIcon={
                  isLoading ? (
                    <CircularProgress sx={{ color: Colors.placeholderColor }} size={20} />
                  ) : (
                    <KeyboardArrowRightOutlinedIcon />
                  )
                }
                disabled={isLoading || !!Object.keys(errors).length}
                sx={{ ...AlternativeButtonWithBorderStyles }}
                onClick={handleSubmit(signInClick)}
                variant="contained"
                fullWidth
              >
                LOGIN
              </Button>
            </Box>
            {/* <img
              src="https://artytraders.com/wp-content/uploads/2024/04/Arty-Traders-Logo.png"
              style={{ height: '50px' }}
            />
            <Typography
              sx={{
                '@media (max-width: 580px)': {
                  width: '340px',
                  mb: '8px',
                },
                marginTop: '18px',
                color: 'black',
              }}
              textAlign={'center'}
              fontWeight={600}
              fontSize={18}
            >
              The First Artwork Valuation and Prediction Tool
            </Typography>
            <Typography
              sx={{
                '@media (max-width: 580px)': {
                  marginBottom: '16px',
                  width: '340px',
                },
                marginBottom: '24px',
                width: '550px',
              }}
              fontFamily={'Poppins'}
              textAlign={'center'}
              color={'#4b4b4b'}
              fontWeight={300}
              fontSize={16}
            >
              Instantly analyze artwork structure and estimate its value with a simple image upload.
            </Typography> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
