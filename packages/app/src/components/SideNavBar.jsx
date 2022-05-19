import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import logo from '../images/oticon-logo.png';

import { atomTopMenuList, atomSubMenuList } from '../recoils';
import { getColor } from '../utils';

const SideNavBar = ({ currentPage }) => {
  const [topMenuList, setTopMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList, setSubMenuList] = useRecoilState(atomSubMenuList);
  const [isOpened, setIsOpened] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let topMenuOpened = {};
    let menuAnimation = {};
    for (let value of Object.values(topMenuList)) {
      if (subMenuList[value].includes(currentPage)) topMenuOpened[value] = true;
      menuAnimation[value] = true;
    }
    setIsOpened(topMenuOpened);
  }, []);

  const onClkTopMenu = (topMenu) => {
    let topMenuOpened = { ...isOpened };
    topMenuOpened[topMenu] = !topMenuOpened[topMenu];
    if (topMenuOpened[topMenu]) {
      setIsOpened(topMenuOpened);
    } else {
      setIsOpened(topMenuOpened);
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
                isopened={String(isOpened[topMenu])}
                iscurrentpage={String(subMenu === currentPage)}
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
  height: inherit;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopMenuWrapper = styled.div`
  height: calc(100% - 110px);
  width: 100%;
  background-color: ${getColor('purple')};
`;

const LogoWrapper = styled.div`
  height: 110px;
  width: 100%;
  line-height: 110px;
  background-color: ${getColor('white')};
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
  color: ${getColor('white')};
  text-align: left;
  cursor: pointer;
  padding-left: 30px;
  border: 0px;
  background-color: ${getColor('purple')};

  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

const TopMenuLink = styled(Link)`
  height: 80px;
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  color: ${getColor('white')};
  text-align: left;
  line-height: 80px;
  padding-left: 30px;
  display: inline-block;
  box-sizing: border-box;
  border: 0px;
  background-color: ${getColor('purple')};
  text-decoration: none;
  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

const SubMenuWrapper = styled.div`
  height: fit-content;
  width: 100%;
`;

const dropDownOpen = keyframes`
  0% {
    height: 0px;
    opacity: 0;
  }
  100% {
    height: 50px;
    opacity: 1;
  }
`;

const dropDownClose = keyframes`
  0% {
    height: 50px;
    opacity: 1;
  }
  100% {
    height: 0px;
    opacity: 0;
  }
`;

const SubMenuLink = styled(Link)`
  height: ${(props) => (props.isopened === 'true' ? '50px' : '0px')};
  display: ${(props) => (props.isopened === 'undefined' ? 'none' : 'block')};
  opacity: ${(props) =>
    props.isopened === 'undefined' || props.isopened === 'false' ? 0 : 1};
  pointer-events: ${(props) =>
    props.isopened === 'undefined' || props.isopened === 'false' ? 'none' : 'auto'};
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: ${getColor('white')};
  text-align: left;
  line-height: 50px;
  padding-left: 50px;
  display: block;
  box-sizing: border-box;
  border: 0px;
  background-color: ${(props) =>
    props.iscurrentpage === 'true'
      ? `${getColor('dark_purple')};`
      : `${getColor('purple')};`};
  text-decoration: none;
  animation-delay: 0s;
  animation: ${(props) => {
    if (props.isopened === 'undefined') return null;
    return props.isopened === 'true' // 대문자로 props 선언하면 error 뜨는데 왜지??
      ? css`
          ${dropDownOpen} 0.3s 0s
        `
      : css`
          ${dropDownClose} 0.3s 0s
        `;
  }};

  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

export default SideNavBar;
