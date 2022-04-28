import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postAdminLogin } from '../apis/APIs';
import { atomIsLogin, atomAdminName } from '../recoils';

const AdminLogin = () => {
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin);
  const [adminName, setAdminName] = useRecoilState(atomAdminName);

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
        <LoginLabel>관리자 로그인</LoginLabel>
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
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContentsWrapper = styled.div`
  height: 550px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 3px solid gray;
  border-radius: 10px;
`;

const LoginLabel = styled.label`
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const LoginInfoText = styled.div`
  height: 50px;
  width: 300px;
  text-align: left;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
`;

const LoginInfoInput = styled.input`
  height: 50px;
  width: 300px;
  display: block;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  height: 50px;
  width: 310px;
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
