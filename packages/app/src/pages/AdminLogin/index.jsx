import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { postAdminLogin } from '../../apis/APIs';
import { atomIsLogin } from '../../recoil/atoms';
import logo from '../../images/oticon-logo.png';
import {
  WholeWrapper,
  LogoWrapper,
  LogoImg,
  LoginContentsWrapper,
  LoginInfoText,
  LoginInfoInput,
  LoginButton,
  IdRememberWrapper,
  IdRememberChkBox,
} from './styles.jsx';

const AdminLogin = () => {
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
  const [, setIsLogin] = useRecoilState(atomIsLogin);

  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem('isLogin'))) {
      alert('이미 로그인 되었습니다.');
      navigate('/');
    }
    if (cookies.rememberId) {
      setIsRemember(true);
      setID(cookies.rememberId);
    }
  }, [cookies.rememberId, navigate]);

  const onChangeID = (e) => {
    e.preventDefault();
    setID(e.target.value);
    if (isRemember) setCookie('rememberId', e.target.value, { maxAge: 24 * 60 * 60 });
  };

  const onChangePW = (e) => {
    e.preventDefault();
    setPW(e.target.value);
  };

  const onChangeChkBox = (e) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      setCookie('rememberId', ID, { maxAge: 24 * 60 * 60 });
    } else {
      removeCookie('rememberId');
    }
  };

  const login = async () => {
    try {
      const response = await postAdminLogin(ID, PW);
      window.sessionStorage.setItem(
        'admin',
        JSON.stringify(response.data.token, 'accessToken')
      );
      window.sessionStorage.setItem('isLogin', true);
      window.sessionStorage.setItem('adminName', response.data.name);
      setIsLogin(true);
      alert('로그인에 성공하였습니다.');
      navigate(-1);
    } catch (err) {
      if (err.response.status === 401) alert('로그인 정보가 잘못되었습니다.');
    }
  };

  return (
    <WholeWrapper>
      <LoginContentsWrapper>
        <LogoWrapper>
          <LogoImg src={logo} onClick={() => navigate('/')} />
        </LogoWrapper>
        <LoginInfoText>아이디</LoginInfoText>
        <LoginInfoInput value={ID} onChange={onChangeID}></LoginInfoInput>
        <LoginInfoText>비밀번호</LoginInfoText>
        <LoginInfoInput type='password' value={PW} onChange={onChangePW}></LoginInfoInput>
        <IdRememberWrapper>
          <IdRememberChkBox
            type='checkbox'
            checked={isRemember}
            onChange={onChangeChkBox}
          ></IdRememberChkBox>
          ID 저장하기
        </IdRememberWrapper>
        <LoginButton onClick={login}>로그인</LoginButton>
      </LoginContentsWrapper>
    </WholeWrapper>
  );
};

export default AdminLogin;
