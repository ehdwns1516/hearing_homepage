import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { getColor } from '../../utils';

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  position: relative;
  width: 100vw;
  height: 60px;
  z-index: 1;
`;

const TopMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1200px;
  height: 50px;
  background-color: ${getColor('purple')};
`;
const MenuButtonWrapper = styled.div`
  flex-direction: column;
  float: left;
  width: 240px;
  height: auto;
`;

const TopMenuButton = styled.button`
  text-align: center;
  width: 240px;
  height: 50px;
  border: 0px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 22px;

  :hover {
    background-color: ${getColor('dark_purple')};
  }
  cursor: pointer;
`;

const TopMenuLink = styled(Link)`
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  width: 240px;
  height: 50px;
  border: 0px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  line-height: 50px;

  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

const SubMenuWrapper = styled.div`
  width: 240px;
  height: 0px;
`;

const dropDownOpen = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SubMenuLink = styled(Link)`
  display: ${(props) => (props.dropdownanimation === 'undefined' ? 'block' : 'block')};
  box-sizing: border-box;
  text-align: center;
  width: 240px;
  height: ${(props) => (props.dropdownanimation === 'true' ? '50px' : '0px')};
  border: 0px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  line-height: 50px;
  animation-delay: 0s;
  animation: ${(props) =>
    props.dropdownanimation === 'true' // 대문자로 props 선언하면 error 뜨는데 왜지??
      ? css`
          ${dropDownOpen} 0.3s 0s
        `
      : null};

  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

export {
  WholeWrapper,
  TopMenuWrapper,
  MenuButtonWrapper,
  TopMenuButton,
  TopMenuLink,
  SubMenuWrapper,
  dropDownOpen,
  SubMenuLink,
};
