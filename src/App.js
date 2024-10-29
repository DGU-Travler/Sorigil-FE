import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';
import Help from './pages/help/Help';
import Setting from './pages/setting/Setting';
import Popup from './pages/popup/Popup';
import NotFound from './pages/error/NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Popup />} />
          <Route path="/help" element={<Help />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

export default App;
