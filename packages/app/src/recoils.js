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

const atomCurrentPage = atom({
  key: 'currentPage',
  default: 'Main',
});

export { atomTopMenuList, atomSubMenuList, atomCurrentPage };
