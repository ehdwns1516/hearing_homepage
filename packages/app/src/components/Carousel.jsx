import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { AiFillSetting } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getColor } from '../utils';

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
  const intervalID = useRef(null);
  useEffect(() => {
    return () => {
      clearInterval(intervalID.current);
    };
  }, []);

  useEffect(() => {
    if (initAutoCarousel) setSlideAuto();
  }, [initAutoCarousel]);

  useEffect(() => {
    if (editCarouselModalOpened === true) {
      clearInterval(intervalID.current);
    } else if (editCarouselModalOpened === false) {
      setSlideAuto();
    }
  }, [editCarouselModalOpened]);

  const nextOnClick = () => {
    if (imageCurrentNo < imageInfos.length) setImageCurrentNo(imageCurrentNo + 1);
    if (imageCurrentNo + 1 === imageInfos.length) setImageCurrentNo(0);
  };

  const prevOnClick = () => {
    if (imageCurrentNo > 0) setImageCurrentNo(imageCurrentNo - 1);
    else setImageCurrentNo(imageInfos.length - 1);
  };

  const imageOnClick = (linkURL) => {
    if (linkURL) window.open(linkURL, '_blank');
  };

  const setSlideAuto = () => {
    if (autoSlideTime && nextButtonRef.current) {
      intervalID.current = setInterval(() => {
        nextButtonRef.current.click();
        if (!nextButtonRef.current) clearInterval(intervalID.current);
      }, autoSlideTime * 1000);
    }
  };

  return (
    <WholeWrapper
      carousel_config={carousel_config}
      onMouseEnter={
        !editCarouselModalOpened
          ? () => {
              clearInterval(intervalID.current);
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

const WholeWrapper = styled.div`
  display: inline-block;
  position: relative;
  top: 0px;
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
  border: 2px solid grey;
  background-color: ${getColor('white')};
`;

const NavBox = styled.div`
  display: inline-block;
  text-align: center;
  position: absolute;
  top: -30px;
  left: ${(props) => (props.carousel_config.width - 60) / 2}px;
  width: 60px;
  height: 30px;
  border-radius: 20px;
  background-color: ${getColor('gray')};
  color: ${getColor('light_gray')};
  font-size: 14px;
  line-height: 30px;
  z-index: 1;
`;

const SlideList = styled.div`
  overflow: hidden;
  width: ${(props) => {
    return css`
        calc(${props.imageCount} * ${props.carousel_config.width}px);
        `;
  }};
  height: ${(props) => props.carousel_config.height}px;
  transition: all 500ms ease 0s;
`;

const SlideContent = styled.div`
  display: table;
  float: left;
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
`;

const ImageWrapper = styled.picture`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const NoticeImage = styled.img`
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
  cursor: ${(props) => (props.pointable === '' ? 'default' : 'pointer')};
`;

const NextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  position: absolute;
  top: ${(props) => (props.carousel_config.height - 50) / 2}px;
  right: -50px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${getColor('dark_gray')};
  color: ${getColor('light_gray')};
  font-size: 40px;

  :hover {
    background-color: ${getColor('darker_gray')};
  }
`;

const PrevButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  position: absolute;
  top: ${(props) => (props.carousel_config.height - 50) / 2}px;
  left: -50px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${getColor('dark_gray')};
  color: ${getColor('light_gray')};
  font-size: 40px;

  :hover {
    background-color: ${getColor('darker_gray')};
  }
`;

const DeleteImageButton = styled.button`
  position: absolute;
  bottom: -50px;
  left: ${(props) => (props.carousel_config.width - 100) / 2}px;
  width: 100px;
  height: 50px;
  border: 0px;
  border-radius: 5px;
  background-color: ${getColor('red')};
  color: ${getColor('white')};
  font-size: large;
  font-weight: bold;

  :hover {
    background-color: ${getColor('dark_red')};
  }
`;

const SlideBox = styled.div`
  overflow: hidden;
  position: relative;
  width: inherit;
  height: inherit;

  &:hover ${NextButton} {
    right: 5px;
    transition: right 0.5s;
  }

  &:hover ${PrevButton} {
    left: 5px;
    transition: left 0.5s;
  }

  &:hover ${DeleteImageButton} {
    bottom: 15px;
    transition: bottom 0.5s;
  }

  &:hover ${NavBox} {
    top: 10px;
    transition: top 0.5s;
  }
`;

const EditCarouselImage = styled(AiFillSetting)`
  width: 50px;
  height: 50px;
  color: ${getColor('dark_gray')};
`;

const EditCarouselButton = styled.div`
  display: ${(props) => (props.islogin ? 'visible' : 'none')};
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  margin: auto;
  z-index: 1;

  :hover {
    ${EditCarouselImage} {
      color: ${getColor('darker_gray')};
    }
  }
`;

export default Carousel;
