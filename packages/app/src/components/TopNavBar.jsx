import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { atomTopMenuList, atomSubMenuList } from '../recoils';

const TopNavBar = () => {
  const [topMenuList, setTopMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList, setSubMenuList] = useRecoilState(atomSubMenuList);
  const [isOpened, setIsOpened] = useState({});
  const [topMenuAnimation, setTopMenuAnimation] = useState({});

  useEffect(() => {}, []);

  const onClkTopMenu = (topMenu) => {
    let topMenuOpened = { ...isOpened };
    topMenuOpened[topMenu] = !topMenuOpened[topMenu];
    if (topMenuOpened[topMenu]) {
      let menuAnimation = { ...topMenuAnimation };
      menuAnimation[topMenu] = true;
      setTopMenuAnimation(menuAnimation);
      setIsOpened(topMenuOpened);
    } else {
      let menuAnimation = { ...topMenuAnimation };
      menuAnimation[topMenu] = false;
      setTopMenuAnimation(menuAnimation);
      setTimeout(() => setIsOpened(topMenuOpened), 250);
    }
  };

  const getSubMenus = (topMenu, index) => {
    return (
      <React.Fragment key={index}>
        <MenuButtonWrapper>
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
        </MenuButtonWrapper>
      </React.Fragment>
    );
  };

  return (
    <WholeWrapper>
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
  width: 100vw;
  height: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  z-index: 1;
`;

const TopMenuWrapper = styled.div`
  height: 50px;
  width: 1200px;
  background-color: #b4338a;
  display: flex;
  flex-direction: row;
`;
const MenuButtonWrapper = styled.div`
  height: auto;
  width: 240px;
  float: left;
  flex-direction: column;
`;

const TopMenuButton = styled.button`
  height: 50px;
  width: 240px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  text-align: center;
  cursor: pointer;
  border: 0px;
  background-color: #b4338a;

  :hover {
    background-color: #892e6c;
  }
`;

const TopMenuLink = styled(Link)`
  height: 50px;
  width: 240px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 50px;
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
  height: auto;
  width: 240px;
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
  width: 240px;
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
    props.dropdownanimation === 'true' // 대문자로 props 선언하면 error 뜨는데 왜지??
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

export default TopNavBar;
