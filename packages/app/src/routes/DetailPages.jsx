import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { atomTopMenuList, atomSubMenuList } from '../recoils';
import DetailPage from '../components/DetailPage';

const DetailPages = () => {
  const [topMenuList, setTopMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList, setSubMenuList] = useRecoilState(atomSubMenuList);
  return (
    <Routes>
      {topMenuList.map((topMenu, index) => {
        if (subMenuList[topMenu].length === 0)
          return (
            <Route
              key={index}
              path={`${encodeURIComponent(
                topMenu.replace(/(\s*)/g, '')
              )}/${encodeURIComponent(topMenu.replace(/(\s*)/g, ''))}`}
              element={<DetailPage topMenu={topMenu} subMenu={topMenu} />}
            />
          );
        return subMenuList[topMenu].map((subMenu) => {
          return (
            <Route
              key={index}
              path={`${encodeURIComponent(
                topMenu.replace(/(\s*)/g, '')
              )}/${encodeURIComponent(subMenu.replace(/(\s*)/g, ''))}`}
              element={<DetailPage topMenu={topMenu} subMenu={subMenu} />}
            />
          );
        });
      })}
    </Routes>
  );
};

export default DetailPages;
