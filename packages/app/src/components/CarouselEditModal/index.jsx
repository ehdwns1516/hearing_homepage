import React, { useState, useRef, useEffect, useCallback } from 'react';
import Carousel from '../Carousel';
import { postUploadImagesToS3, putNoticeInfos } from '../../apis/APIs';
import {
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContents,
  EditImageWrapper,
  AddImageButton,
  ImageHiddenInput,
  ImageLinkWrapper,
  ImageLinkInput,
  ImageLinkAddButton,
  CloseButtonlImage,
  CloseButton,
} from './styles.jsx';
const CarouselEditModal = ({
  visibleEditCarousel,
  imageInfos,
  imageCurrentNo,
  setImageCurrentNo,
  carousel_config,
}) => {
  const [contents, setContents] = useState(imageInfos);
  const [linkURL, setLinkURL] = useState('');
  const imageInput = useRef(null);
  const selectedImage = useRef(null);
  const imageInfoIsChanged = useRef(0);
  const imageIndex = useRef(0);

  useEffect(() => {
    if (!imageInfoIsChanged.current) return;
    (async () => {
      try {
        const response = await putNoticeInfos('MainPageCarousel', contents);
        if (imageInfoIsChanged.current === 1) {
          alert('이미지를 성공적으로 업로드하였습니다.');
        } else if (imageInfoIsChanged.current === 2) {
          alert('이미지를 성공적으로 삭제하였습니다.');
        } else if (imageInfoIsChanged.current === 3) {
          alert('url 적용에 성공하였습니다.');
        }
        console.log(response);
        imageInfoIsChanged.current = 0;
      } catch (error) {
        imageInfoIsChanged.current = 0;
        alert('ERROR: ' + error);
        console.log(error.response);
      }
    })();
  }, [contents]);

  useEffect(() => {
    if (contents.length) setLinkURL(contents[imageCurrentNo]['linkUrl']);
  }, [imageCurrentNo]);

  const imgUploadBtnClick = useCallback((event, position) => {
    event.preventDefault();
    imageIndex.current = position;
    imageInput.current.click();
  }, []);

  const deleteImage = useCallback(() => {
    if (window.confirm('이미지를 정말 삭제하시겠습니까?')) {
      const afterContents = [...contents];
      afterContents.splice(imageCurrentNo, 1);

      if (imageCurrentNo > 0) setImageCurrentNo(imageCurrentNo - 1);

      imageInfoIsChanged.current = 2;
      setContents(afterContents);
    }
  }, [contents, imageCurrentNo, setImageCurrentNo, setContents]);

  const onChangeImage = useCallback(
    async (event) => {
      if (!event.target.files[0]) return;
      selectedImage.current = event.target.files[0];
      let data = new FormData();
      data.append('image', selectedImage.current);

      try {
        const response = await postUploadImagesToS3(data);
        const afterContents = [...contents];
        let index =
          imageCurrentNo || afterContents.length
            ? imageCurrentNo + imageIndex.current
            : 0;
        afterContents.splice(index, 0, {
          imageUrl: response.data.url,
          linkUrl: '',
        });
        imageInfoIsChanged.current = 1;
        setContents(afterContents);
        setImageCurrentNo(index);
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    },
    [contents, setContents, setImageCurrentNo]
  );

  const onChangeLinkURL = useCallback(
    (event) => {
      setLinkURL(event.target.value.trim());
    },
    [setLinkURL]
  );

  const saveLinkURLOnClk = useCallback(() => {
    let imageURL = contents[imageCurrentNo]['imageUrl'];
    const afterContents = [...contents];
    afterContents.splice(imageCurrentNo, 1, {
      imageUrl: imageURL,
      linkUrl: linkURL,
    });
    imageInfoIsChanged.current = 3;
    setContents(afterContents);
  }, [contents, setContents]);

  return (
    <>
      <ModalOverlay onClick={visibleEditCarousel} />
      <ModalWrapper tabIndex='-1'>
        <ModalInner
          tabIndex='0'
          style={{
            width: carousel_config.width + 140,
            height: carousel_config.height + 150,
          }}
        >
          <ImageHiddenInput
            ref={imageInput}
            type='file'
            accept='image/*'
            onChange={onChangeImage}
          ></ImageHiddenInput>
          <ModalContents>
            <CloseButton onClick={visibleEditCarousel}>
              <CloseButtonlImage></CloseButtonlImage>
            </CloseButton>
            <EditImageWrapper>
              <AddImageButton onClick={(e) => imgUploadBtnClick(e, 0)}>+</AddImageButton>
              <Carousel
                imageInfos={contents}
                imageCurrentNo={imageCurrentNo}
                setImageCurrentNo={setImageCurrentNo}
                deleteImage={deleteImage}
                carousel_config={{
                  width: (carousel_config.width * 9) / 10,
                  height: (carousel_config.height * 9) / 10,
                }}
              ></Carousel>
              <AddImageButton onClick={(e) => imgUploadBtnClick(e, 1)}>+</AddImageButton>
            </EditImageWrapper>
            <ImageLinkWrapper width={(carousel_config.width * 9) / 10 + 80}>
              <ImageLinkInput
                placeholder='적용할 url을 입력하세요.'
                value={linkURL || ''}
                onChange={onChangeLinkURL}
              />
              <ImageLinkAddButton onClick={saveLinkURLOnClk}>적용하기</ImageLinkAddButton>
            </ImageLinkWrapper>
          </ModalContents>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default CarouselEditModal;
