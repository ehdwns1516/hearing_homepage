import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { atomTopMenuList, atomSubMenuList } from '../../recoil/atoms';
import {
  WholeWrapper,
  TopMenuWrapper,
  MenuButtonWrapper,
  TopMenuButton,
  TopMenuLink,
  SubMenuWrapper,
  SubMenuLink,
} from './styles.jsx';

const TopNavBar = () => {
  const [topMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList] = useRecoilState(atomSubMenuList);
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

export default TopNavBar;
