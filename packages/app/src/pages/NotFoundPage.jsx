import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../images/oticon-logo.png';
import { getColor } from '../utils';

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

const WholeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const NotFoundWrapper = styled.div`
  height: 30%;
  width: 50%;
  text-align: center;
`;

const MainPageButton = styled.img`
  width: 420px;
  height: 100px;
  cursor: pointer;
`;

const NotFoundContent1 = styled.div`
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
`;

const NotFoundContent2 = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 20px;
  color: ${getColor('gray')};
  font-style: italic;
`;

const ReturnHome = styled.a`
  font-size: 20px;
  margin-top: 30px;
`;
export default NotFoundPage;
