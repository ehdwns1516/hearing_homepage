import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
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
} from './styles.jsx';

const Carousel = ({
  imageInfos,
  imageCurrentNo,
  setImageCurrentNo,
  deleteImage = null,
  visibleEditCarousel = null,
  isLogin = false,
  autoSlideTime = 0,
  carousel_config,
  editCarouselModalOpened = false,
}) => {
  const [initAutoCarousel, setInitAutoCarousel] = useState(false);
  const nextButtonRef = useRef(null);
  const timeoutID = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(timeoutID.current);
    };
  }, []);

  useEffect(() => {
    if (initAutoCarousel) setSlideAuto();
  }, [initAutoCarousel]);

  useEffect(() => {
    if (editCarouselModalOpened === true) {
      clearTimeout(timeoutID.current);
    } else if (editCarouselModalOpened === false) {
      setSlideAuto();
    }
  }, [editCarouselModalOpened]);

  const nextOnClick = useCallback(() => {
    if (imageCurrentNo < imageInfos.length) setImageCurrentNo(imageCurrentNo + 1);
    if (imageCurrentNo + 1 === imageInfos.length) setImageCurrentNo(0);
  }, [imageCurrentNo, imageInfos, setImageCurrentNo, setImageCurrentNo]);

  const prevOnClick = useCallback(() => {
    if (imageCurrentNo > 0) setImageCurrentNo(imageCurrentNo - 1);
    else setImageCurrentNo(imageInfos.length - 1);
  }, [imageCurrentNo, imageInfos, setImageCurrentNo, setImageCurrentNo]);

  const imageOnClick = useCallback((linkURL) => {
    if (linkURL) window.open(linkURL, '_blank');
  }, []);

  const setSlideAuto = useCallback(() => {
    if (autoSlideTime && nextButtonRef.current) {
      timeoutID.current = setTimeout(() => {
        if (!nextButtonRef.current) {
          clearTimeout(timeoutID.current);
          return;
        }
        nextButtonRef.current.click();
        setSlideAuto();
      }, autoSlideTime * 1000);
    }
  }, [autoSlideTime]);

  return (
    <WholeWrapper
      carousel_config={carousel_config}
      onMouseEnter={
        !editCarouselModalOpened
          ? () => {
              clearTimeout(timeoutID.current);
            }
          : null
      }
      onMouseLeave={
        !editCarouselModalOpened
          ? () => {
              if (!editCarouselModalOpened) setSlideAuto();
            }
          : null
      }
    >
      <EditCarouselButton islogin={isLogin} onClick={visibleEditCarousel}>
        <EditCarouselImage></EditCarouselImage>
      </EditCarouselButton>
      <SlideBox>
        <NavBox carousel_config={carousel_config}>
          {imageInfos.length === 0 ? 0 : imageCurrentNo + 1} / {imageInfos.length}
        </NavBox>
        <SlideList
          style={{
            transform: `translate3d(
                ${imageCurrentNo * -carousel_config.width}px, 0px, 0px`,
          }}
          imageCount={imageInfos.length}
          carousel_config={carousel_config}
        >
          {imageInfos.map((image, index) => {
            return (
              <SlideContent key={index} carousel_config={carousel_config}>
                <ImageWrapper>
                  <NoticeImage
                    src={`${image.imageUrl}`}
                    carousel_config={carousel_config}
                    onClick={() => imageOnClick(image.linkUrl)}
                    pointable={image.linkUrl}
                  ></NoticeImage>
                </ImageWrapper>
              </SlideContent>
            );
          })}
        </SlideList>
        {imageInfos.length ? (
          <PrevButton onClick={prevOnClick} carousel_config={carousel_config}>
            <IoIosArrowBack></IoIosArrowBack>
          </PrevButton>
        ) : null}
        {imageInfos.length ? (
          <NextButton
            ref={(el) => {
              nextButtonRef.current = el;
              setInitAutoCarousel(true);
            }}
            onClick={nextOnClick}
            carousel_config={carousel_config}
          >
            <IoIosArrowForward></IoIosArrowForward>
          </NextButton>
        ) : null}
        {deleteImage && imageInfos.length ? (
          <DeleteImageButton
            onClick={() => deleteImage()}
            carousel_config={carousel_config}
          >
            삭제하기
          </DeleteImageButton>
        ) : null}
      </SlideBox>
    </WholeWrapper>
  );
};

export default Carousel;
