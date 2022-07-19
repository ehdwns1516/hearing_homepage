import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { atomIsLogin, atomAdminName } from '../../recoil/atoms';
import {
  WholeWrapper,
  MyFooter,
  LoginImage,
  LogoutImage,
  LoginButton,
} from './styles.jsx';

const Footer = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin);
  const [, setAdminName] = useRecoilState(atomAdminName);

  const loginOnClick = () => {
    navigate('/login');
  };
  const logoutOnClick = () => {
    window.sessionStorage.setItem('isLogin', false);
    window.sessionStorage.setItem('adminName', '');
    window.sessionStorage.setItem('admin', '');
    setIsLogin(false);
    setAdminName('');
    alert('로그아웃 되었습니다.');
    window.location.reload();
  };

  return (
    <WholeWrapper>
      <MyFooter>
        <div>오티콘보청기 | 대표 : 이정훈 | 사업자등록번호 : 124-47-74045</div>
        <div>경기도 수원시 팔달구 매산로1가 57-105 비전포에버 2층</div>
        <div
          style={{
            fontWeight: 'bold',
          }}
        >
          Copyright © 2022 오티콘보청기 수원점 All Rights Reserved.
        </div>
      </MyFooter>
      {!isLogin ? (
        <LoginButton onClick={loginOnClick}>
          <LoginImage></LoginImage>
          Admin
        </LoginButton>
      ) : (
        <LoginButton onClick={logoutOnClick}>
          <LogoutImage></LogoutImage>
          Logout
        </LoginButton>
      )}
    </WholeWrapper>
  );
};

export default Footer;
