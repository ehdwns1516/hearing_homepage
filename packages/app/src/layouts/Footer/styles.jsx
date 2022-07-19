import styled from 'styled-components';
import { getColor } from '../../utils';
import { FaUserCog, FaUserSlash } from 'react-icons/fa';

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

export { WholeWrapper, MyFooter, LoginImage, LogoutImage, LoginButton };
