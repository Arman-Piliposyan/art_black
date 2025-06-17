import createAxiosInstance from '../api/axios';

export const saveImgUrl = async (data: { image_url: string }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(
      'https://simulacrum-service-walle.onrender.com/arty-traders/analyze-the-art-by-url',
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveImgFile = async (data: FormData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await createAxiosInstance().post(
      'https://simulacrum-service-walle.onrender.com/arty-traders/img',
      data,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const AnalyzeImgFile = async (data: FormData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await createAxiosInstance().post(
      'https://simulacrum-service-walle.onrender.com/arty-traders/analyze-the-art-by-base64',
      data,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const SubmitImgFile = async (data: FormData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await createAxiosInstance().post(
      'https://simulacrum-service-walle.onrender.com/arty-traders/img',
      data,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// export const getChartData = () => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = createAxiosInstance().get(
//       'https://simulacrum-service-walle.onrender.com/arty-traders/date-price-by-min-max',
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const saveFile = async (data: FormData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await createAxiosInstance().post(
      'https://app-top.simulacrumai.com/channel/addepar/upload-file',
      data,
      axiosConfig,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFilesData = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('https://app-top.simulacrumai.com/channel/addepar/files');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getChartData = (id: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(
      `https://app-top.simulacrumai.com/channel/addepar/price-chart/${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
