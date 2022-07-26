import React, { useState, useCallback } from 'react';
import {
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
} from './styles.jsx';
const ImageEnlargeModal = ({ images, imageIndex, openEnlargeImageModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);

  const slideNext = useCallback(() => {
    if (images.length - 1 === currentImageIndex) return;
    setCurrentImageIndex(currentImageIndex + 1);
  }, [images, currentImageIndex, setCurrentImageIndex]);

  const slidePrev = useCallback(() => {
    if (0 === currentImageIndex) return;
    setCurrentImageIndex(currentImageIndex - 1);
  }, [currentImageIndex, setCurrentImageIndex]);

  return (
    <>
      <ModalOverlay />
      <ModalWrapper tabIndex='-1'>
        <CloseButton onClick={openEnlargeImageModal}>
          <CloseButtonImage></CloseButtonImage>
        </CloseButton>
        <PrevButton onClick={slidePrev}>
          <PrevButtonImage></PrevButtonImage>
        </PrevButton>
        <NextButton onClick={slideNext}>
          <NextButtonImage></NextButtonImage>
        </NextButton>
        <ModalInner tabIndex='0'>
          <ModalContents>
            <ImgWrapper>
              <Img
                onClick={openEnlargeImageModal}
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
