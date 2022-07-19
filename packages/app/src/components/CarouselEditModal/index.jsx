import React, { useState, useRef, useEffect } from 'react';
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
    putNoticeInfos('MainPageCarousel', contents)
      .then((res) => {
        if (imageInfoIsChanged.current === 1) {
          alert('이미지를 성공적으로 업로드하였습니다.');
        } else if (imageInfoIsChanged.current === 2) {
          alert('이미지를 성공적으로 삭제하였습니다.');
        } else if (imageInfoIsChanged.current === 3) {
          alert('url 적용에 성공하였습니다.');
        }
        console.log(res);
        imageInfoIsChanged.current = 0;
      })
      .catch((err) => {
        imageInfoIsChanged.current = 0;
        alert('ERROR: ' + err);
        console.log(err);
      });
  }, [contents]);

  useEffect(() => {
    if (contents.length) setLinkURL(contents[imageCurrentNo]['linkUrl']);
  }, [imageCurrentNo]);

  const imgUploadBtnClick = (event, position) => {
    event.preventDefault();
    imageIndex.current = position;
    imageInput.current.click();
  };

  const deleteImage = () => {
    if (window.confirm('이미지를 정말 삭제하시겠습니까?')) {
      const afterContents = [...contents];
      afterContents.splice(imageCurrentNo, 1);

      if (imageCurrentNo > 0) setImageCurrentNo(imageCurrentNo - 1);

      imageInfoIsChanged.current = 2;
      setContents(afterContents);
    }
  };

  const onChangeImage = (event) => {
    if (!event.target.files[0]) return;
    selectedImage.current = event.target.files[0];
    let data = new FormData();
    data.append('image', selectedImage.current);

    postUploadImagesToS3(data)
      .then((res) => {
        const afterContents = [...contents];
        let index =
          imageCurrentNo || afterContents.length
            ? imageCurrentNo + imageIndex.current
            : 0;
        afterContents.splice(index, 0, {
          imageUrl: res.data.url,
          linkUrl: '',
        });
        imageInfoIsChanged.current = 1;
        setContents(afterContents);
        setImageCurrentNo(index);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeLinkURL = (event) => {
    setLinkURL(event.target.value.trim());
  };

  const saveLinkURLOnClk = () => {
    let imageURL = contents[imageCurrentNo]['imageUrl'];
    const afterContents = [...contents];
    afterContents.splice(imageCurrentNo, 1, {
      imageUrl: imageURL,
      linkUrl: linkURL,
    });
    imageInfoIsChanged.current = 3;
    setContents(afterContents);
  };

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
