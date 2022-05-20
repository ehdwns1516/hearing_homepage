import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postAdminLogin } from '../apis/APIs';
import { atomIsLogin } from '../recoils';
import logo from '../images/oticon-logo.png';
import { getColor } from '../utils';

const AdminLogin = () => {
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin);

  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem('isLogin'))) {
      alert('이미 로그인 되었습니다.');
      navigate('/');
    }
    if (cookies.rememberId) {
      setIsRemember(true);
      setID(cookies.rememberId);
    }
  }, []);

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

  const login = () => {
    postAdminLogin(ID, PW)
      .then((res) => {
        window.sessionStorage.setItem(
          'admin',
          JSON.stringify(res.data.token, 'accessToken')
        );
        window.sessionStorage.setItem('isLogin', true);
        window.sessionStorage.setItem('adminName', res.data.name);
        setIsLogin(true);
        alert('로그인에 성공하였습니다.');
        navigate(-1);
      })
      .catch((err) => {
        if (err.response.status === 401) alert('로그인 정보가 잘못되었습니다.');
        console.log(err);
      });
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

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  object-fit: cover;
  width: 100%;
  height: 75px;
  margin-bottom: 20px;
  margin-top: 50px;
`;

const LogoImg = styled.img`
  vertical-align: middle;
  width: auto;
  height: auto;
  cursor: pointer;
`;

const LoginContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 550px;
  border: 3px solid gray;
  border-radius: 10px;
  background-color: ${getColor('white')};
`;

const LoginInfoText = styled.div`
  text-align: left;
  width: 300px;
  height: 50px;
  font-weight: bold;
  line-height: 50px;
  font-size: 20px;
`;

const LoginInfoInput = styled.input`
  display: block;
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  padding-left: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 20px;
`;

const LoginButton = styled.button`
  width: 310px;
  height: 50px;
  font-size: 20px;
`;

const IdRememberWrapper = styled.div`
  display: flex;
  width: 320px;
  height: auto;
  margin-bottom: 20px;
`;

const IdRememberChkBox = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

export default AdminLogin;
