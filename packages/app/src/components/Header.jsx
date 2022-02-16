import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { atomIsLogin, atomAdminName } from '../recoils';

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin);
  const [adminName, setAdminName] = useRecoilState(atomAdminName);

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
    navigate('/');
  };

  return (
    <HeaderWrapper>
      {isLogin ? (
        <React.Fragment>
          <AdminLogoutButton onClick={logoutOnClick}>Admin Logout</AdminLogoutButton>
          <WelcomeLabel>
            <span
              style={{
                color: '#b4338a',
                fontWeight: 'bold',
              }}
            >
              {adminName}
            </span>
            님 오늘도 화이팅!
          </WelcomeLabel>
        </React.Fragment>
      ) : (
        <AdminLoginButton onClick={loginOnClick}>Admin Login</AdminLoginButton>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 50px;
`;

const AdminLoginButton = styled.button`
  position: absolute;
  right: 10px;
  top: 5px;
  width: auto;
  height: 30px;
  font-size: 15px;
`;

const AdminLogoutButton = styled.button`
  margin-top: 5px;
  margin-right: 10px;
  float: right;
  width: auto;
  height: 30px;
  font-size: 15px;
`;

const WelcomeLabel = styled.label`
  margin-top: 10px;
  margin-right: 10px;
  float: right;
  height: 30px;
  width: auto;
  font-size: 15px;
`;

export default Header;
