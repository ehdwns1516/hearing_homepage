import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SideNavBar from './SideNavBar';

const DetailPage = ({ topMenu, subMenu }) => {
  useEffect(() => {}, []);

  return (
    <WholeWrapper>
      <SideWrapper>
        <SideNavBar currentPage={subMenu} />
      </SideWrapper>
      <ContentsWrapper>
        <TitleText>{topMenu}</TitleText>
        <HorizonLine>
          <InnerText>{subMenu}</InnerText>
        </HorizonLine>
      </ContentsWrapper>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const ContentsWrapper = styled.div`
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SideWrapper = styled.div`
  height: 100%;
  width: 25%;
  border-right: 1px solid #b4338a;
  text-align: center;
  background-color: blue;
`;

const HorizonLine = styled.div`
  width: 90%;
  border-bottom: 1px solid #b4338a;
  line-height: 0em;
  margin-top: 20px;
`;

const InnerText = styled.span`
  background-color: white;
  color: rgba(0, 0, 0, 0.5);
  padding: 0 10px;
  font-size: 20px;
`;

const TitleText = styled.span`
  font-size: 30px;
  margin-top: 50px;
`;

export default DetailPage;
