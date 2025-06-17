import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { format } from 'date-fns';

import { LineChartSection } from './LineChartSection';
import { useArtyContext } from '../../../ArtyContext';
import styles from './style.module.scss';
import { FileDataType } from '..';

import { getChartData } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

type Props = { file: FileDataType; index: number };

export const SingleImageItem = ({ index, file }: Props) => {
  const { setFilesData, filesData } = useArtyContext();

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const contentRef = useRef([]);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const handleClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getChartData(file.id);
        const findIndex = filesData.findIndex((item: FileDataType) => {
          return item.id === file.id;
        });

        setFilesData([
          ...filesData.slice(0, findIndex),
          { ...filesData[findIndex], processing: false, chartData: data },
          ...filesData.slice(findIndex + 1),
        ]);
        clearInterval(intervalIdRef.current);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    intervalIdRef.current = setInterval(() => {
      if (!file.processing) {
        clearInterval(intervalIdRef.current);
      } else {
        fetchData();
      }
    }, 3000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <Box
      sx={{
        border: '1px solid white',
        flexDirection: 'column',
        display: 'flex',
        width: '100%',
      }}
    >
      <Box
        sx={{
          cursor: `${file.processing ? 'default' : 'pointer'}`,
          alignItems: 'center',
          display: 'flex',
          padding: '16px',
          width: '100%',
        }}
        onClick={() => {
          if (file.processing) {
            return;
          }
          handleClick(index);
        }}
      >
        <Box
          sx={{
            width: '20%',
          }}
        >
          <img
            style={{ borderRadius: '6px', height: '48px', width: '48px' }}
            className="uploadImg"
            src={file.artwork}
          />
        </Box>

        <Typography sx={{ width: '20%' }} fontWeight={500} fontSize={16}>
          {file.valuationId}
        </Typography>
        <Typography sx={{ width: '20%' }} fontWeight={500} fontSize={16}>
          {format(new Date(file.date), 'MM/dd/yyyy')}
        </Typography>
        <Typography sx={{ width: '20%' }} fontWeight={500} fontSize={16}>
          {file.digitalRate}
        </Typography>

        <Box
          sx={{
            pr: file.processing ? '0px' : '24px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
            width: '20%',
            gap: '16px',
          }}
        >
          {file.processing ? (
            <span className={styles.loader}>Pr &nbsp; cessing Now</span>
          ) : (
            <>
              <DoneIcon sx={{ color: '#769B7D', fontSize: '32px' }} />
              <ArrowBackIosNewIcon
                sx={{
                  transform: openIndex === index ? 'rotate(90deg)' : 'rotate(270deg)',
                  transition: 'transform 0.3s ease',
                  color: Colors.white,
                }}
              />
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          maxHeight: openIndex === index ? contentRef.current[index]?.scrollHeight + 'px' : 0,
          transition: 'max-height 0.3s ease',
          borderRadius: '0 0 24px 24px',
          overflow: 'hidden',
          width: '100%',
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref={(el) => (contentRef.current[index] = el)}
      >
        {/* <AccordionItem
            setOpenIntegrationModel={setOpenIntegrationModel}
            setOpenCreationModel={setOpenCreationModel}
            setUpdateDomainData={setUpdateDomainData}
            providerId={domain.providerId}
            accounts={domain.accounts}
            domainId={domain.domainId}
          /> */}

        {file.processing ? null : <LineChartSection chartData={file.chartData} />}
      </Box>
    </Box>
  );
};
