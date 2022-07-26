import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Theme } from './global_style';
import loadable from '@loadable/component';

const MainPage = loadable(() => import('./pages/MainPage'));
const AdminLogin = loadable(() => import('./pages/AdminLogin'));
const DetailPages = loadable(() => import('./routes/DetailPageRoutes'));

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<AdminLogin />} />
            <Route path='/*' element={<DetailPages />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
