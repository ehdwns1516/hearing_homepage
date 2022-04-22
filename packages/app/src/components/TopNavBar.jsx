import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';

import { atomTopMenuList, atomSubMenuList } from '../recoils';

const TopNavBar = () => {
  const [topMenuList, setTopMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList, setSubMenuList] = useRecoilState(atomSubMenuList);
  const [isOpened, setIsOpened] = useState({});

  useEffect(() => {}, []);

  const hoverTopMenu = (topMenu) => {
    let topMenuOpened = { ...isOpened };
    topMenuOpened[topMenu] = !topMenuOpened[topMenu];
    if (topMenuOpened[topMenu]) {
      for (let menu in topMenuOpened) {
        if (topMenu !== menu) topMenuOpened[menu] = false;
      }
      setIsOpened(topMenuOpened);
    } else {
      for (let menu in topMenuOpened) {
        if (topMenu !== menu) topMenuOpened[menu] = false;
      }
      setIsOpened(topMenuOpened);
    }
  };

  const getSubMenus = (topMenu, index) => {
    return (
      <React.Fragment key={index}>
        <MenuButtonWrapper
          onMouseLeave={() => hoverTopMenu(topMenu)}
          onMouseEnter={() => hoverTopMenu(topMenu)}
        >
          <TopMenuButton>{topMenu}</TopMenuButton>
          <SubMenuWrapper>
            {subMenuList[topMenu].map((subMenu, idx) => {
              return (
                <SubMenuLink
                  key={idx}
                  to={`/${encodeURIComponent(
                    topMenu.replace(/(\s*)/g, '')
                  )}/${encodeURIComponent(subMenu.replace(/(\s*)/g, ''))}`}
                  dropdownanimation={String(isOpened[topMenu])}
                >
                  {isOpened[topMenu] ? subMenu : null}
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
          return getSubMenus(topMenu, index);
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
  height: 0px;
  width: 240px;
`;

const dropDownOpen = keyframes`
  0% {
    /* height: 0px; */
    opacity: 0;
  }
  100% {
    /* height: 50px; */
    opacity: 1;
  }
`;

const dropDownClose = keyframes`
  0% {
    /* height: 50px; */
    opacity: 1;
  }
  100% {
    /* height: 0px; */
    opacity: 0;
  }
`;

const SubMenuLink = styled(Link)`
  height: ${(props) => (props.dropdownanimation === 'true' ? '50px' : '0px')};
  display: ${(props) => (props.dropdownanimation === 'undefined' ? 'block' : 'block')};
  /* opacity: ${(props) =>
    props.dropdownanimation === 'undefined' || props.dropdownanimation === 'false'
      ? 1
      : 1}; */
  /* pointer-events: ${(props) =>
    props.dropdownanimation === 'undefined' || props.dropdownanimation === 'false'
      ? 'none'
      : 'auto'}; */
  width: 240px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 50px;
  /* padding-left: 50px; */
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
      : // css`
        //     ${dropDownClose} 0.4s 0s
        //   `
        null};
  :hover {
    background-color: #892e6c;
  }
`;

export default TopNavBar;
