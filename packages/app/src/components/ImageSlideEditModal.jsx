import React from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';

const ImageSlideEditModal = ({ visibleEditImageSlide, imageInfos }) => {
  return (
    <>
      <ModalOverlay />
      <ModalWrapper tabIndex='-1'>
        <ModalInner tabIndex='0'>
          <ModalContents>
            <CloseButton onClick={visibleEditImageSlide}>X</CloseButton>
            <EditImageWrapper>
              <AddImageButton>+</AddImageButton>
              <ImageSlide imageInfos={imageInfos}></ImageSlide>
              <AddImageButton>+</AddImageButton>
            </EditImageWrapper>
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
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
  height: 90%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const ModalContents = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: beige;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
`;

const EditImageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background-color: black;
  justify-content: center;
`;

const AddImageButton = styled.button`
  border: 0px;
  height: 500px;
  width: 40px;
  display: inline-block;
  font-size: 35px;
  font-weight: bold;
`;

export default ImageSlideEditModal;
