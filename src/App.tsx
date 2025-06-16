import { ThemeProvider, CssBaseline } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import 'react-toastify/dist/ReactToastify.css';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundaryModal } from './common/components/ErrorBoundaryModal';
import { ArtyContextProvider } from './views/Arty/ArtyContext';
import { getThemeObjectByMode } from './globalStyles/theme';
import DynamicStyles from './globalStyles/DynamicStyles';
import { scoreData } from './views/Arty/data';
import { Arty } from './views/Arty';
import './index.scss';
// import { App as CollectorApp } from 'collector/CollectorApp';
// import { ClientChat } from 'commutator/ClientChat';

const themeMode = 'light';

const App = () => {
  const themeOverrides = useMemo(() => getThemeObjectByMode(themeMode), []);
  // for (let index = 0; index < 5; index++) {
  //   scoreData.push((Math.random() * (2 - 0.2) + 0.2).toFixed(1));
  // }
  return (
    <>
      <CssBaseline />
      <DynamicStyles />
      <ThemeProvider theme={themeOverrides}>
        <ErrorBoundary fallback={<ErrorBoundaryModal />}>
          <ArtyContextProvider>
            <Arty />
          </ArtyContextProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
