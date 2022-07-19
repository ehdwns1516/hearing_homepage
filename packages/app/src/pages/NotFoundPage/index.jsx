import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/oticon-logo.png';
import {
  WholeWrapper,
  NotFoundWrapper,
  MainPageButton,
  NotFoundContent1,
  NotFoundContent2,
  ReturnHome,
} from './styles.jsx';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <WholeWrapper>
      <NotFoundWrapper>
        <MainPageButton src={logo} onClick={() => navigate('/')}></MainPageButton>
        <NotFoundContent1>페이지가 존재하지 않습니다.</NotFoundContent1>
        <NotFoundContent2>
          링크를 잘못 입력하셨거나 페이지가 삭제/이동되었을 수 있습니다.
        </NotFoundContent2>
        <ReturnHome href='/'>메인 페이지</ReturnHome>
      </NotFoundWrapper>
    </WholeWrapper>
  );
};

export default NotFoundPage;
