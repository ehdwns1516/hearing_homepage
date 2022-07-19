import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/oticon-logo.png';

import { atomTopMenuList, atomSubMenuList } from '../../recoil/atoms';
import {
  WholeWrapper,
  TopMenuWrapper,
  LogoWrapper,
  LogoImg,
  TopMenuButton,
  TopMenuLink,
  SubMenuWrapper,
  SubMenuLink,
} from './styles.jsx';

const SideNavBar = ({ currentPage }) => {
  const [topMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList] = useRecoilState(atomSubMenuList);
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

export default SideNavBar;
