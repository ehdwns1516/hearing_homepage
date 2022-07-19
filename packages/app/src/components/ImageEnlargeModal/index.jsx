import React, { useState } from 'react';
import {
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContents,
  NextButton,
  NextButtonlImage,
  PrevButton,
  PrevButtonlImage,
  ImgWrapper,
  Img,
  CloseButtonlImage,
  CloseButton,
} from './styles.jsx';
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

export default ImageEnlargeModal;
