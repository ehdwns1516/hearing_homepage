import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SideNavBar from './SideNavBar';

const DetailPage = ({ topMenu, subMenu }) => {
  useEffect(() => {
    console.log('qwe');
  }, []);

  return (
    <WholeWrapper>
      <SideWrapper>
        <SideNavBar currentPage={subMenu} />
      </SideWrapper>
      <ContentsWrapper>
        {topMenu}
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
  background-color: green;
`;

const SideWrapper = styled.div`
  height: 100%;
  width: 25%;
  text-align: center;
`;

const HorizonLine = styled.div`
  width: 90%;
  border-bottom: 1px solid #aaa;
  line-height: 0.1em;
  margin: 10px 0 20px;
`;

const InnerText = styled.span`
  background-color: white;
  padding: '0 10px';
`;

export default DetailPage;
