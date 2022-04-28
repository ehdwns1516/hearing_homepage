import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { AiFillSetting } from 'react-icons/ai';

const Carousel = ({
  imageInfos,
  imageCurrentNo,
  setImageCurrentNo,
  deleteImage = null,
  visibleEditCarousel = null,
  isLogin = false,
  autoSlideTime = 0,
  carousel_config,
  editCarouselModalOpened,
}) => {
  const [intervalID, setIntervalID] = useState(null);
  const nextButtonRef = useRef();

  useEffect(() => {
    if (editCarouselModalOpened === true) {
      clearInterval(intervalID);
      setIntervalID(null);
    } else if (editCarouselModalOpened === false) {
      setSlideAuto();
    }
  }, [editCarouselModalOpened]);

  const setSlideAuto = () => {
    if (autoSlideTime) {
      const new_intervalID = setInterval(
        () => nextButtonRef.current.click(),
        autoSlideTime * 1000
      );
      setIntervalID(new_intervalID);
    }
  };

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

  return (
    <WholeWrapper
      carousel_config={carousel_config}
      onMouseEnter={
        !editCarouselModalOpened
          ? () => {
              clearInterval(intervalID);
              setIntervalID(null);
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
            {'<'}
          </PrevButton>
        ) : null}
        {imageInfos.length ? (
          <NextButton
            ref={nextButtonRef}
            onClick={nextOnClick}
            carousel_config={carousel_config}
          >
            {'>'}
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
  position: relative;
  top: 0px;
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
  display: inline-block;
  background-color: white;
  border: 2px solid grey;
`;

const NavBox = styled.div`
  position: absolute;
  top: -30px;
  left: ${(props) => (props.carousel_config.width - 60) / 2}px;
  width: 60px;
  height: 30px;
  display: inline-block;
  border-radius: 20px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #eeeeee;
  background-color: grey;
  z-index: 1;
`;

const SlideList = styled.div`
  width: ${(props) => {
    return css`
        calc(${props.imageCount} * ${props.carousel_config.width}px);
        `;
  }};
  height: ${(props) => props.carousel_config.height}px;
  transition: all 500ms ease 0s;
  overflow: hidden;
`;

const SlideContent = styled.div`
  display: table;
  width: ${(props) => props.carousel_config.width}px;
  height: ${(props) => props.carousel_config.height}px;
  float: left;
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
  position: absolute;
  top: 240px;
  right: -50px;
  width: 50px;
  height: 50px;
  font-size: 40px;
  line-height: 0px;
  border-radius: 5px;
  background-color: #515151;
  :hover {
    background-color: #393939;
  }
  color: #eeeeee;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 240px;
  left: -50px;
  width: 50px;
  height: 50px;
  font-size: 40px;
  line-height: 0px;
  border-radius: 5px;
  background-color: #515151;
  :hover {
    background-color: #393939;
  }
  color: #eeeeee;
`;

const DeleteImageButton = styled.button`
  position: absolute;
  left: ${(props) => (props.carousel_config.width - 100) / 2}px;
  bottom: -50px;
  width: 100px;
  height: 50px;
  border: 0px;
  border-radius: 5px;
  font-size: large;
  font-weight: bold;
  color: white;
  background-color: #cc0000;
  :hover {
    background-color: #b30000;
  }
`;

const SlideBox = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  overflow: hidden;
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
  color: #515151;
  width: 50px;
  height: 50px;
`;

const EditCarouselButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 50px;
  width: 50px;
  margin: auto;
  display: ${(props) => (props.islogin ? 'visible' : 'none')};
  z-index: 1;
  :hover {
    ${EditCarouselImage} {
      color: #393939;
    }
  }
`;

export default Carousel;
