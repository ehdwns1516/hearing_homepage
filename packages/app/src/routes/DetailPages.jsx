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
      {topMenuList.map((topMenu) => {
        console.log('asd');
        return subMenuList[topMenu].map((subMenu) => {
          console.log(subMenu.replace(/(\s*)/g, ''));
          return (
            <Route
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
