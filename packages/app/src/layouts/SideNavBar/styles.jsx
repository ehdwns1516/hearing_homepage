import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { getColor } from '../../utils';

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  overflow-x: hidden;
  width: 100%;
  height: inherit;
`;

const TopMenuWrapper = styled.div`
  width: 100%;
  height: calc(100% - 110px);
  background-color: ${getColor('purple')};
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 110px;
  background-color: ${getColor('white')};
  line-height: 110px;
`;

const LogoImg = styled.img`
  vertical-align: middle;
  width: inherit;
  height: auto;
  cursor: pointer;
`;

const TopMenuButton = styled.button`
  text-align: left;
  width: 100%;
  height: 80px;
  padding-left: 30px;
  border: 0px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  font-size: 25px;
  font-weight: bold;

  :hover {
    background-color: ${getColor('dark_purple')};
  }
  cursor: pointer;
`;

const TopMenuLink = styled(Link)`
  display: inline-block;
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  height: 80px;
  padding-left: 30px;
  border: 0px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  font-size: 25px;
  font-weight: bold;
  line-height: 80px;
  text-decoration: none;
  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

const SubMenuWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const dropDownOpen = keyframes`
  0% {
    height: 0px;
    opacity: 0;
  }
  100% {
    height: 50px;
    opacity: 1;
  }
`;

const dropDownClose = keyframes`
  0% {
    height: 50px;
    opacity: 1;
  }
  100% {
    height: 0px;
    opacity: 0;
  }
`;

const SubMenuLink = styled(Link)`
  display: ${(props) => (props.isopened === 'undefined' ? 'none' : 'block')};
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  height: ${(props) => (props.isopened === 'true' ? '50px' : '0px')};
  padding-left: 50px;
  border: 0px;
  background-color: ${(props) =>
    props.iscurrentpage === 'true'
      ? `${getColor('dark_purple')};`
      : `${getColor('purple')};`};
  color: ${getColor('white')};
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  text-decoration: none;
  animation-delay: 0s;
  animation: ${(props) => {
    if (props.isopened === 'undefined') return null;
    return props.isopened === 'true' // 대문자로 props 선언하면 error 뜨는데 왜지??
      ? css`
          ${dropDownOpen} 0.3s 0s
        `
      : css`
          ${dropDownClose} 0.3s 0s
        `;
  }};
  opacity: ${(props) =>
    props.isopened === 'undefined' || props.isopened === 'false' ? 0 : 1};
  pointer-events: ${(props) =>
    props.isopened === 'undefined' || props.isopened === 'false' ? 'none' : 'auto'};

  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

export {
  WholeWrapper,
  TopMenuWrapper,
  LogoWrapper,
  LogoImg,
  TopMenuButton,
  TopMenuLink,
  SubMenuWrapper,
  SubMenuLink,
};
