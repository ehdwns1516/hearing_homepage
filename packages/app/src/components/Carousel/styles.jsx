import styled, { css } from 'styled-components';
import { getColor } from '../../utils';

import { AiFillSetting } from 'react-icons/ai';

const WholeWrapper = styled.div`
  display: inline-block;
  position: relative;
  top: 0px;
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
  border: 2px solid grey;
  background-color: ${getColor('white')};
`;

const NavBox = styled.div`
  display: inline-block;
  text-align: center;
  position: absolute;
  top: -30px;
  left: ${(props) => (props.carousel_config.width - 60) / 2}px;
  width: 60px;
  height: 30px;
  border-radius: 20px;
  background-color: ${getColor('gray')};
  color: ${getColor('light_gray')};
  font-size: 14px;
  line-height: 30px;
  z-index: 1;
`;

const SlideList = styled.div`
  overflow: hidden;
  width: ${(props) => {
    return css`
      calc(${props.imageCount} * ${props.carousel_config.width}px);
      `;
  }};
  height: ${(props) => props.carousel_config.height}px;
  transition: all 500ms ease 0s;
`;

const SlideContent = styled.div`
  display: table;
  float: left;
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
`;

const ImageWrapper = styled.picture`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const NoticeImage = styled.img`
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
  cursor: ${(props) => (props.pointable === '' ? 'default' : 'pointer')};
`;

const NextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  position: absolute;
  top: ${(props) => (props.carousel_config.height - 50) / 2}px;
  right: -50px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${getColor('dark_gray')};
  color: ${getColor('light_gray')};
  font-size: 40px;

  :hover {
    background-color: ${getColor('darker_gray')};
  }
`;

const PrevButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  position: absolute;
  top: ${(props) => (props.carousel_config.height - 50) / 2}px;
  left: -50px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${getColor('dark_gray')};
  color: ${getColor('light_gray')};
  font-size: 40px;

  :hover {
    background-color: ${getColor('darker_gray')};
  }
`;

const DeleteImageButton = styled.button`
  position: absolute;
  bottom: -50px;
  left: ${(props) => (props.carousel_config.width - 100) / 2}px;
  width: 100px;
  height: 50px;
  border: 0px;
  border-radius: 5px;
  background-color: ${getColor('red')};
  color: ${getColor('white')};
  font-size: large;
  font-weight: bold;

  :hover {
    background-color: ${getColor('dark_red')};
  }
`;

const SlideBox = styled.div`
  overflow: hidden;
  position: relative;
  width: inherit;
  height: inherit;

  &:hover ${NextButton} {
    right: 5px;
    transition: right 0.5s;
  }

  &:hover ${PrevButton} {
    left: 5px;
    transition: left 0.5s;
  }

  &:hover ${DeleteImageButton} {
    bottom: 15px;
    transition: bottom 0.5s;
  }

  &:hover ${NavBox} {
    top: 10px;
    transition: top 0.5s;
  }
`;

const EditCarouselImage = styled(AiFillSetting)`
  width: 50px;
  height: 50px;
  color: ${getColor('dark_gray')};
`;

const EditCarouselButton = styled.div`
  display: ${(props) => (props.islogin ? 'visible' : 'none')};
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  margin: auto;
  z-index: 1;

  :hover {
    ${EditCarouselImage} {
      color: ${getColor('darker_gray')};
    }
  }
`;

export {
  WholeWrapper,
  NavBox,
  SlideList,
  SlideContent,
  ImageWrapper,
  NoticeImage,
  NextButton,
  PrevButton,
  DeleteImageButton,
  SlideBox,
  EditCarouselImage,
  EditCarouselButton,
};
