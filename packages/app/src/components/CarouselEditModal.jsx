import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
import { IoIosClose } from 'react-icons/io';
import { postUploadImagesToS3, putNoticeInfos } from '../apis/APIs';
import { getColor } from '../utils';

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

const ModalWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  overflow: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  outline: 0;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  display: block;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  position: relative;
  top: 50%;
  margin: 0 auto;
  padding: 20px 20px;
  border-radius: 10px;
  background-color: ${getColor('white')};
  transform: translateY(-50%);
`;

const ModalContents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const EditImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
  margin-top: 40px;
  border: 3px solid grey;
  border-radius: 5px;
`;

const AddImageButton = styled.button`
  display: inline-block;
  width: 40px;
  border: 0px;
  background-color: ${getColor('green')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 35px;

  :hover {
    background-color: ${getColor('dark_green')};
  }
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

const ImageLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${(props) => props.width + 10}px;
  height: 100px;
  padding-left: 3px;
`;
const ImageLinkInput = styled.input`
  width: 90%;
  height: 50px;
  padding-left: 10px;
  border-radius: 5px;
  border: 0px;
  outline: 2px solid grey;
  font-style: italic;
  font-size: 20px;

  :focus {
    outline: 2px solid ${getColor('purple')};
  }
`;

const ImageLinkAddButton = styled.div`
  width: 10%;
  height: 50px;
  margin-left: 10px;
  border: 3px solid ${getColor('purple')};
  border-radius: 5px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;

  :hover {
    border: 3px solid ${getColor('dark_purple')};
    background-color: ${getColor('dark_purple')};
  }
  cursor: pointer;
`;

const CloseButtonlImage = styled(IoIosClose)`
  width: 70px;
  height: 70px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 70px;
  height: 70px;
  margin: auto;

  :hover {
    ${CloseButtonlImage} {
      color: ${getColor('darker_gray')};
    }
  }
  cursor: pointer;
`;

export default CarouselEditModal;
