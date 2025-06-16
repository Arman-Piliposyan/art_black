import axios from 'axios';

const createAxiosInstance = (widgetKey?: string) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  if (widgetKey) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${widgetKey}`;
  }
  if (token && !widgetKey) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  axiosInstance.interceptors.response.use(
    (config) => config,
    async (config) => {
      if (config.response && config.response.status === 401) {
        if (!refreshToken) {
          window.location.reload();
        }
      }
      return Promise.reject(config);
    },
  );

  return axiosInstance;
};

export default createAxiosInstance;
