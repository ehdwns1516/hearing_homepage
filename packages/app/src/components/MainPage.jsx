import React from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';

const MainPage = () => {
  return (
    <WholeWrapper>
      메인페이지
      <ImageSlide></ImageSlide>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export default MainPage;
