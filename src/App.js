import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';
import Help from './pages/help/Help';
import Setting from './pages/setting/Setting';
import Popup from './pages/popup/Popup';
import NotFound from './pages/error/NotFound';
import TTS from './pages/tts/TTS';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Popup />} />
          <Route path="/help" element={<Help />} />
          <Route path="/set" element={<Setting />} />
          <Route path="/tts" element={<TTS />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
