import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { atomTopMenuList, atomSubMenuList } from '../recoils';

const SideNavBar = ({ currentPage }) => {
  const [topMenuList, setTopMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList, setSubMenuList] = useRecoilState(atomSubMenuList);

  const getSubMenus = (topMenu, index) => {
    return (
      <React.Fragment key={index}>
        <TopMenuButton>{topMenu}</TopMenuButton>
        <SubMenuWrapper>
          {subMenuList[topMenu].map((subMenu, index) => {
            return <SubMenuButton key={index}>{subMenu}</SubMenuButton>;
          })}
        </SubMenuWrapper>
      </React.Fragment>
    );
  };

  return (
    <WholeWrapper>
      <LogoWrapper></LogoWrapper>
      <TopMenuWrapper>
        {topMenuList.map((topMenu, index) => {
          if (subMenuList[topMenu].includes(currentPage))
            return getSubMenus(topMenu, index);
          else return <TopMenuButton key={index}>{topMenu}</TopMenuButton>;
        })}
      </TopMenuWrapper>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  height: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: green;
`;

const TopMenuWrapper = styled.div`
  height: 85%;
  width: 100%;
  background-color: white;
`;

const LogoWrapper = styled.div`
  height: 15%;
  width: 100%;
  background-color: black;
`;

const TopMenuButton = styled.button`
  height: 75px;
  width: 100%;
  background-color: wheat;
`;

const SubMenuWrapper = styled.div`
  height: fit-content;
  width: 100%;
  background-color: blue;
`;

const SubMenuButton = styled.button`
  height: 40px;
  width: 100%;
  background-color: yellow;
`;

export default SideNavBar;
