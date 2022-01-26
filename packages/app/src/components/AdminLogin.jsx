import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../apis/defaultAxios';

const AdminLogin = () => {
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');

  const onChangeID = (e) => {
    e.preventDefault();
    setID(e.target.value);
  };

  const onChangePW = (e) => {
    e.preventDefault();
    setPW(e.target.value);
  };

  const login = () => {
    axios.get('/address').then((res) => {
      console.log(res.data);
    }); // API 통신 확인
  };

  return (
    <WholeWrapper>
      <LoginContentsWrapper>
        <LoginLabel>관리자 로그인</LoginLabel>
        <LoginInfoText>아이디</LoginInfoText>
        <LoginInfoInput value={ID} onChange={onChangeID}></LoginInfoInput>
        <LoginInfoText>비밀번호</LoginInfoText>
        <LoginInfoInput type='password' value={PW} onChange={onChangePW}></LoginInfoInput>
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
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  height: 50px;
  width: 310px;
  font-size: 20px;
`;

export default AdminLogin;
