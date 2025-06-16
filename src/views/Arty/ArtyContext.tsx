import React, { createContext, useContext, useState } from 'react';

type ArtyContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};

const ArtyContext = createContext({} as ArtyContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const ArtyContextProvider = ({ children }: Props): JSX.Element => {
  const [imgURL, setImgURL] = useState('');
  const [base64URL, setBase64URL] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imgURLLoading, setImgURLLoading] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [imgFileLoading, setImgFileLoading] = useState(false);
  const [thirdSectionLoading, setThirdSectionLoading] = useState(true);
  const [imageAnalyticsData, setImageAnalyticsData] = useState(null);
  const [chartData, setChartData] = useState({
    x: [],
    y: [],
  });

  const contextData = {
    setThirdSectionLoading,
    setImageAnalyticsData,
    thirdSectionLoading,
    imageAnalyticsData,
    setImgFileLoading,
    setShowFirstPage,
    setImgURLLoading,
    imgFileLoading,
    showFirstPage,
    imgURLLoading,
    setChartData,
    setBase64URL,
    chartData,
    base64URL,
    setImgURL,
    setFile,
    imgURL,
    file,
  };

  return <ArtyContext.Provider value={contextData}>{children}</ArtyContext.Provider>;
};

export const useArtyContext = () => {
  const contextData = useContext(ArtyContext);
  return contextData;
};
