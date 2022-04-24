import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DetailPages from './routes/DetailPages';
import MainPage from './routes/MainPage';
import AdminLogin from './routes/AdminLogin';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<AdminLogin />} />
          <Route path='/*' element={<DetailPages />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
