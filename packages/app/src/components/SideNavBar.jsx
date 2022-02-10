import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import logo from '../images/oticon-logo.png';

import { atomTopMenuList, atomSubMenuList } from '../recoils';

const SideNavBar = ({ currentPage }) => {
  const [topMenuList, setTopMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList, setSubMenuList] = useRecoilState(atomSubMenuList);
  const [isOpened, setIsOpened] = useState({});
  const [topMenuAnimation, setTopMenuAtimation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let topMenuOpend = {};
    let menuAnimation = {};
    for (let value of Object.values(topMenuList)) {
      topMenuOpend[value] = subMenuList[value].includes(currentPage) ? true : false;
      menuAnimation[value] = true;
    }
    setTopMenuAtimation(menuAnimation);
    setIsOpened(topMenuOpend);
  }, []);

  const onClkTopMenu = (topMenu) => {
    let topMenuOpened = { ...isOpened };
    topMenuOpened[topMenu] = !topMenuOpened[topMenu];
    if (topMenuOpened[topMenu]) {
      let menuAnimation = { ...topMenuAnimation };
      menuAnimation[topMenu] = true;
      setTopMenuAtimation(menuAnimation);
      setIsOpened(topMenuOpened);
    } else {
      let menuAnimation = { ...topMenuAnimation };
      menuAnimation[topMenu] = false;
      setTopMenuAtimation(menuAnimation);
      setTimeout(() => setIsOpened(topMenuOpened), 250);
    }
  };

  const getSubMenus = (topMenu, index) => {
    return (
      <React.Fragment key={index}>
        <TopMenuButton onClick={() => onClkTopMenu(topMenu)}>{topMenu}</TopMenuButton>
        <SubMenuWrapper>
          {subMenuList[topMenu].map((subMenu, idx) => {
            return (
              <SubMenuLink
                key={idx}
                to={`/${encodeURIComponent(
                  topMenu.replace(/(\s*)/g, '')
                )}/${encodeURIComponent(subMenu.replace(/(\s*)/g, ''))}`}
                dropdownanimation={String(topMenuAnimation[topMenu])}
              >
                {subMenu}
              </SubMenuLink>
            );
          })}
        </SubMenuWrapper>
      </React.Fragment>
    );
  };

  return (
    <WholeWrapper>
      <LogoWrapper>
        <LogoImg src={logo} onClick={() => navigate('/')} />
      </LogoWrapper>
      <TopMenuWrapper>
        {topMenuList.map((topMenu, index) => {
          if (isOpened[topMenu]) return getSubMenus(topMenu, index);
          if (subMenuList[topMenu].length === 0)
            return (
              <TopMenuLink
                key={index}
                to={`/${encodeURIComponent(
                  topMenu.replace(/(\s*)/g, '')
                )}/${encodeURIComponent(topMenu.replace(/(\s*)/g, ''))}`}
              >
                {topMenu}
              </TopMenuLink>
            );
          return (
            <TopMenuButton key={index} onClick={() => onClkTopMenu(topMenu)}>
              {topMenu}
            </TopMenuButton>
          );
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
`;

const TopMenuWrapper = styled.div`
  height: calc(100% - 110px);
  width: 100%;
  background-color: #b4338a;
`;

const LogoWrapper = styled.div`
  height: 110px;
  width: 100%;
  line-height: 110px;
  background-color: white;
`;

const LogoImg = styled.img`
  height: auto;
  width: inherit;
  vertical-align: middle;
  cursor: pointer;
`;

const TopMenuButton = styled.button`
  height: 80px;
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  color: white;
  text-align: left;
  cursor: pointer;
  padding-left: 30px;
  border: 0px;
  background-color: #b4338a;

  :hover {
    background-color: #892e6c;
  }
`;

const TopMenuLink = styled(Link)`
  height: 80px;
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  color: white;
  text-align: left;
  line-height: 80px;
  padding-left: 30px;
  display: inline-block;
  box-sizing: border-box;
  border: 0px;
  background-color: #b4338a;
  text-decoration: none;
  :hover {
    background-color: #892e6c;
  }
`;

const SubMenuWrapper = styled.div`
  height: fit-content;
  width: 100%;
`;

const dropDownOpen = keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: 50px;
  }
`;

const dropDownClose = keyframes`
  0% {
    height: 50px;
  }
  100% {
    height: 0px;
  }
`;

const SubMenuLink = styled(Link)`
  height: 50px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: left;
  line-height: 50px;
  padding-left: 50px;
  display: block;
  box-sizing: border-box;
  border: 0px;
  background-color: #b4338a;
  text-decoration: none;
  animation-delay: 0s;
  animation: ${(props) =>
    props.dropdownanimation === 'true'
      ? css`
          ${dropDownOpen} 0.3s 0s
        `
      : css`
          ${dropDownClose} 0.3s 0s
        `};
  :hover {
    background-color: #892e6c;
  }
`;

export default SideNavBar;
