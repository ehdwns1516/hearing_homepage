import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { atomTopMenuList, atomSubMenuList } from '../recoil/atoms';
import NotFoundPage from '../pages/NotFoundPage';
import loadable from '@loadable/component';

const DetailPage = loadable(() => import('../pages/DetailPage'));

const DetailPages = () => {
  const [topMenuList] = useRecoilState(atomTopMenuList);
  const [subMenuList] = useRecoilState(atomSubMenuList);

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
                element={<DetailPage topMenu={topMenu} subMenu={topMenu} />}
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
                element={<DetailPage topMenu={topMenu} subMenu={subMenu} />}
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
