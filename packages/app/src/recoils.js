import { atom } from 'recoil';

const atomTopMenuList = atom({
  key: 'topMenuList',
  default: ['센터 소개', '보청기', '보청기 지원금', '오시는 길', '주차비 지원'],
});

const atomSubMenuList = atom({
  key: 'subMenuList',
  default: {
    '센터 소개': ['센터 약력', '일하는 사람들', '센터 둘러보기', '이달의 이벤트 및 소식'],
    보청기: ['보청기 제품 목록', '보청기 구입'],
    '보청기 지원금': ['건강보험 대상자', '기초생활 수급자'],
    '오시는 길': [],
    '주차비 지원': [],
  },
});

const atomPageType = atom({
  // 0 -> DetailPage.jsx, 1 -> 이미지 목록으로 보기, 2-> 보청기 간단 정보 목록으로 보기
  key: 'pageType',
  default: {
    '센터 약력': 0,
    '일하는 사람들': 0,
    '센터 둘러보기': 1,
    '이달의 이벤트 및 소식': 0,
    '보청기 제품 목록': 2,
    '보청기 구입': 0,
    '건강보험 대상자': 0,
    '기초생활 수급자': 0,
    '오시는 길': 0,
    '주차비 지원': 0,
  },
});

const atomCurrentPage = atom({
  key: 'currentPage',
  default: 'Main',
});

const atomIsLogin = atom({
  key: 'isLogin',
  default: JSON.parse(window.sessionStorage.getItem('isLogin')),
});

const atomAdminName = atom({
  key: 'adminName',
  default: window.sessionStorage.getItem('adminName'),
});

export {
  atomTopMenuList,
  atomSubMenuList,
  atomPageType,
  atomCurrentPage,
  atomIsLogin,
  atomAdminName,
};
