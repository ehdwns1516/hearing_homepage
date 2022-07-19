import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FaUserCog, FaUserSlash } from 'react-icons/fa';
import { atomIsLogin, atomAdminName } from '../recoil/atoms';
import { getColor } from '../utils';

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

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  width: 100%;
  height: 90px;
  background-color: ${getColor('darker_purple')};
`;

const MyFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: auto;
  height: 90px;
  color: ${getColor('light_gray')};
  font-size: 14px;
`;

const LoginImage = styled(FaUserCog)`
  width: 40px;
  height: 40px;
  color: ${getColor('white')};
`;

const LogoutImage = styled(FaUserSlash)`
  width: 40px;
  height: 40px;
  color: ${getColor('white')};
`;

const LoginButton = styled.button`
  position: relative;
  left: 50px;
  width: 60px;
  height: 60px;
  border: none;
  background-color: ${getColor('darker_purple')};
  color: ${getColor('white')};
  line-height: 15px;
  font-weight: bold;

  :hover {
    color: ${getColor('gray')};
    ${LoginImage} {
      color: ${getColor('gray')};
    }
    ${LogoutImage} {
      color: ${getColor('gray')};
    }
  }
  cursor: pointer;
`;

export default Footer;
