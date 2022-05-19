import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getColor } from '../utils';

const ImageEnlargeModal = ({ images, imageIndex, openEnlageImageModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);

  const slideNext = () => {
    if (images.length - 1 === currentImageIndex) return;
    setCurrentImageIndex(currentImageIndex + 1);
  };
  const slidePrev = () => {
    if (0 === currentImageIndex) return;
    setCurrentImageIndex(currentImageIndex - 1);
  };
  return (
    <>
      <ModalOverlay />
      <ModalWrapper tabIndex='-1'>
        <CloseButton onClick={openEnlageImageModal}>
          <CloseButtonlImage></CloseButtonlImage>
        </CloseButton>
        <PrevButton onClick={slidePrev}>
          <PrevButtonlImage></PrevButtonlImage>
        </PrevButton>
        <NextButton onClick={slideNext}>
          <NextButtonlImage></NextButtonlImage>
        </NextButton>
        <ModalInner tabIndex='0'>
          <ModalContents>
            <ImgWrapper>
              <Img
                onClick={openEnlageImageModal}
                src={images[currentImageIndex]}
                alt='None'
              ></Img>
            </ImgWrapper>
          </ModalContents>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  align-items: center;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 999;
`;

const ModalInner = styled.div`
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const ModalContents = styled.div`
  width: 80%;
  height: auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const CloseButtonlImage = styled(IoIosClose)`
  width: 70px;
  height: 70px;
  color: ${getColor('white')};
`;

const CloseButton = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  height: 70px;
  width: 70px;
  z-index: 1001;
  cursor: pointer;
  :hover {
    ${CloseButtonlImage} {
      color: ${getColor('dark_gray')};
    }
  }
`;

const NextButtonlImage = styled(IoIosArrowForward)`
  width: 80px;
  height: 80px;
  color: ${getColor('white')};
`;

const NextButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 5%;
  top: 25%;
  width: 80px;
  height: 50%;
  z-index: 1001;
  cursor: pointer;
  :hover {
    ${NextButtonlImage} {
      color: ${getColor('dark_gray')};
    }
  }
`;

const PrevButtonlImage = styled(IoIosArrowBack)`
  width: 80px;
  height: 80px;
  color: ${getColor('white')};
`;

const PrevButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 5%;
  top: 25%;
  width: 80px;
  height: 50%;
  z-index: 1001;
  cursor: pointer;
  :hover {
    ${PrevButtonlImage} {
      color: ${getColor('dark_gray')};
    }
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  max-height: 100%;
`;

const Img = styled.img`
  height: auto;
  max-width: 100%;
  max-height: 90vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-drag-over: none;
  -webkit-user-drag: none;
  -moz-window-dragging: none;
`;

export default ImageEnlargeModal;
