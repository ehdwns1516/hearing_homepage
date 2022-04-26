import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { atomTopMenuList, atomSubMenuList } from '../recoils';
import ImgVerticalArrangePage from '../components/ImgVerticalArrangePage';
import NotFoundPage from './NotFoundPage';

const DetailPages = () => {
  const [topMenuList, setTopMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList, setSubMenuList] = useRecoilState(atomSubMenuList);
  return (
    <Routes>
      {topMenuList.map((topMenu, index) => {
        if (subMenuList[topMenu].length === 0)
          return (
            <React.Fragment key={index}>
              <Route
                path={`/${encodeURIComponent(
                  topMenu.replace(/(\s*)/g, '')
                )}/${encodeURIComponent(topMenu.replace(/(\s*)/g, ''))}`}
                element={<ImgVerticalArrangePage topMenu={topMenu} subMenu={topMenu} />}
              />
              <Route
                path={`/${encodeURIComponent(
                  topMenu.replace(/(\s*)/g, '')
                )}/${encodeURIComponent(topMenu.replace(/(\s*)/g, ''))}/*`}
                element={<NotFoundPage />}
              />
            </React.Fragment>
          );
        return subMenuList[topMenu].map((subMenu) => {
          return (
            <React.Fragment key={index}>
              <Route
                path={`/${encodeURIComponent(
                  topMenu.replace(/(\s*)/g, '')
                )}/${encodeURIComponent(subMenu.replace(/(\s*)/g, ''))}`}
                element={<ImgVerticalArrangePage topMenu={topMenu} subMenu={subMenu} />}
              />
              <Route
                path={`/${encodeURIComponent(
                  topMenu.replace(/(\s*)/g, '')
                )}/${encodeURIComponent(subMenu.replace(/(\s*)/g, ''))}/*`}
                element={<NotFoundPage />}
              />
            </React.Fragment>
          );
        });
      })}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default DetailPages;
