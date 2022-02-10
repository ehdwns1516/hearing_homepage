import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DetailPages from './routes/DetailPages';
import MainPage from './components/MainPage';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';

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
      <Footer />
    </RecoilRoot>
  );
};

export default App;
