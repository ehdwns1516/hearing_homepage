import styled from 'styled-components';
import { IoIosClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getColor } from '../../utils';

const ModalWrapper = styled.div`
  display: block;
  box-sizing: border-box;
  align-items: center;
  text-align: center;
  overflow: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  outline: 0;
`;

const ModalOverlay = styled.div`
  display: block;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 999;
`;

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  position: relative;
  top: 50%;
  margin: 0 auto;
  padding: 20px 20px;
  transform: translateY(-50%);
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: auto;
`;

const CloseButtonImage = styled(IoIosClose)`
  width: 70px;
  height: 70px;
  color: ${getColor('white')};
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 70px;
  height: 70px;
  z-index: 1001;
  :hover {
    ${CloseButtonImage} {
      color: ${getColor('dark_gray')};
    }
  }
  cursor: pointer;
`;

const NextButtonImage = styled(IoIosArrowForward)`
  width: 80px;
  height: 80px;
  color: ${getColor('white')};
`;

const NextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%;
  right: 5%;
  width: 80px;
  height: 50%;
  z-index: 1001;
  :hover {
    ${NextButtonImage} {
      color: ${getColor('dark_gray')};
    }
  }
  cursor: pointer;
`;

const PrevButtonImage = styled(IoIosArrowBack)`
  width: 80px;
  height: 80px;
  color: ${getColor('white')};
`;

const PrevButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%;
  left: 5%;
  width: 80px;
  height: 50%;
  z-index: 1001;
  :hover {
    ${PrevButtonImage} {
      color: ${getColor('dark_gray')};
    }
  }
  cursor: pointer;
`;

const ImgWrapper = styled.div`
  width: 100%;
  max-height: 100%;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 90vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-drag-over: none;
  -webkit-user-drag: none;
  -moz-window-dragging: none;
`;

export {
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContents,
  NextButton,
  NextButtonImage,
  PrevButton,
  PrevButtonImage,
  ImgWrapper,
  Img,
  CloseButtonImage,
  CloseButton,
};
