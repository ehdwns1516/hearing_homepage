import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';
import { postUploadImagesToS3, putNoticeInfos } from '../apis/APIs';

const ImageSlideEditModal = ({
  visibleEditImageSlide,
  imageInfos,
  imageCurrentNo,
  setImageCurrentNo,
}) => {
  const [contents, setContents] = useState(imageInfos);
  const imageInput = useRef(null);
  const selectedImage = useRef(null);
  const imageIsChanged = useRef(false);
  const imageIndex = useRef(0);

  useEffect(() => {
    if (!imageIsChanged.current) return;
    putNoticeInfos('MainPageCarousel', contents)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    imageIsChanged.current = false;
  }, [contents]);

  const imgInputBtnClick = (event, position) => {
    event.preventDefault();
    imageIndex.current = imageCurrentNo + position;
    imageInput.current.click();
  };

  const deleteImage = () => {
    const afterContents = [...contents];
    afterContents.splice(imageIndex.current, 1);
    console.log(afterContents);
    imageIsChanged.current = true;
    setContents(afterContents);
  };

  const onChangeImage = (event) => {
    if (!event.target.files[0]) return;
    selectedImage.current = event.target.files[0];
    let data = new FormData();
    data.append('image', selectedImage.current);

    postUploadImagesToS3(data)
      .then((res) => {
        const afterContents = [...contents];
        afterContents.splice(imageIndex.current, 0, {
          imageUrl: res.data.url,
          linkUrl: '',
        });
        imageIsChanged.current = true;
        setContents(afterContents);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ModalOverlay />
      <ModalWrapper tabIndex='-1'>
        <ModalInner tabIndex='0'>
          <ImageHiddenInput
            ref={imageInput}
            type='file'
            accept='image/*'
            onChange={onChangeImage}
          ></ImageHiddenInput>
          <ModalContents>
            <CloseButton onClick={visibleEditImageSlide}>X</CloseButton>
            <EditImageWrapper>
              <AddImageButton onClick={(e) => imgInputBtnClick(e, -1)}>+</AddImageButton>
              <ImageSlide
                imageInfos={contents}
                imageCurrentNo={imageCurrentNo}
                setImageCurrentNo={setImageCurrentNo}
                deleteImage={deleteImage}
              ></ImageSlide>
              <AddImageButton onClick={(e) => imgInputBtnClick(e, 0)}>+</AddImageButton>
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
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
`;

const EditImageWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  border: 3px solid grey;
  border-radius: 5px;
`;

const AddImageButton = styled.button`
  border: 0px;
  height: 500px;
  width: 40px;
  display: inline-block;
  font-size: 35px;
  font-weight: bold;
  color: white;
  background-color: #009933;
  :hover {
    background-color: #00802b;
  }
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

export default ImageSlideEditModal;
