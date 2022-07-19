import styled from 'styled-components';
import { getColor } from '../../utils';

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

export {
  WholeWrapper,
  LogoWrapper,
  LogoImg,
  LoginContentsWrapper,
  LoginInfoText,
  LoginInfoInput,
  LoginButton,
  IdRememberWrapper,
  IdRememberChkBox,
};
