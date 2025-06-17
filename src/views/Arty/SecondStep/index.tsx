import { Typography, IconButton, MenuItem, Menu, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react';

import artyBg from './../../../assets/images/arty_bg.png';
import { useArtyContext } from '../ArtyContext';
import { InputTypeFile } from './InputTypeFile';
import { ImagesSection } from './ImagesSection';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getFilesData } from '/src/services/walleService';
import { ScrollBarStylesGenerator } from '/src/utils';
import { ArtyLogo, PcImage } from '/src/assets';

export const SecondStep = () => {
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);

  const { setShowFirstPage, setFilesData } = useArtyContext();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose();
    localStorage.clear();
    setShowFirstPage(true);
  };

  const getFiles = async () => {
    try {
      const { data } = await getFilesData();
      setFilesData(data);
      setIsLayoutLoading(false);
    } catch (error) {
      console.error(Error);
    }
  };

  useEffect(() => {
    (async () => {
      await getFiles();
    })();
  }, []);

  return (
    <>
      {isLayoutLoading ? (
        <LayoutLoader />
      ) : (
        <Box
          sx={{
            '@media (max-width: 1024px)': {
              flexDirection: 'column',
              gap: '16px',
              ...ScrollBarStylesGenerator('100%'),
              padding: '24px 16px',
            },
            backgroundImage: `url(${artyBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundColor: 'black',
            flexDirection: 'column',
            padding: '48px',
            display: 'flex',
            height: '100%',
            width: '100%',
            gap: '12px',
          }}
        >
          <Box
            sx={{
              justifyContent: 'space-between',
              height: '120px',
              display: 'flex',
              width: '100%',
              mb: '76px',
            }}
          >
            <ArtyLogo />
            <Box sx={{ height: 'max-content', alignItems: 'center', display: 'flex', gap: '8px' }}>
              <Typography fontWeight={500}>{localStorage.getItem('email') || ''}</Typography>
              <div>
                <IconButton
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  aria-haspopup="true"
                  aria-label="more"
                  id="long-button"
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
                <Menu
                  slotProps={{
                    paper: {
                      style: {
                        width: 'max-content',
                      },
                    },
                  }}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  id="long-menu"
                  open={open}
                >
                  {['LogOut'].map((option) => (
                    <MenuItem selected={option === 'Pyxis'} onClick={handleLogOut} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Box>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', gap: '16px', mb: '30px' }}>
            <Typography fontWeight={700} fontSize={48}>
              Get an Instant
            </Typography>
            <Typography color={'#DDCDAC'} fontWeight={700} fontSize={48}>
              Artwork Valuation and
            </Typography>
            <Typography color={'#769C9C'} fontWeight={700} fontSize={48}>
              Price Prediction
            </Typography>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', mb: '46px' }}>
            <Box
              sx={{
                background: 'linear-gradient(0.25turn, #769C9C, #DDCDAC)',
                width: '112px',
                height: '3px',
              }}
            ></Box>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', gap: '30px', mb: '50px' }}>
            <Typography sx={{ width: '35%' }} textAlign={'right'} fontSize={22}>
              Curious about the value of a piece of art? Upload an image to receive valuation and a forecasted
              price prediction by ArtyTraders AI. This feature was developed based on 14 years of research,
              data collection, tests and results refinement.
            </Typography>
            <PcImage />
            <Typography sx={{ width: '35%' }} textAlign={'left'} fontSize={22}>
              Whether you’re an artist, collector, or enthusiast, this tool provides insights into market
              potential and investment worth helping you make informed decisions about your art assets.
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid white',
              flexDirection: 'column',
              height: 'max-content',
              alignItems: 'center',
              display: 'flex',
              width: '100%',
              p: '64px',
            }}
          >
            <Typography sx={{ mb: '48px' }} fontWeight={700} fontSize={24}>
              Please Upload a Picture to Get Valuation
            </Typography>
            <InputTypeFile />
          </Box>
          <ImagesSection />
        </Box>
      )}
    </>
  );
};
