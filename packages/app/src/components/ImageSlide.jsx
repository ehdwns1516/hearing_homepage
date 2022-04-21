import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const IMAGESLIDE_CONFIG = {
  width: 1200,
  height: 530,
};

const ImageSlide = ({
  imageInfos,
  imageCurrentNo,
  setImageCurrentNo,
  deleteImage = null,
  visibleEditImageSlide = null,
  isLogin = false,
}) => {
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
    <WholeWrapper imageslide_config={IMAGESLIDE_CONFIG}>
      <OpenEditImageSlideButton islogin={isLogin} onClick={visibleEditImageSlide}>
        수정
      </OpenEditImageSlideButton>
      <SlideBox>
        <NavBox imageslide_config={IMAGESLIDE_CONFIG}>
          {imageInfos.length === 0 ? 0 : imageCurrentNo + 1} / {imageInfos.length}
        </NavBox>
        <SlideList
          style={{
            transform: `translate3d(
                ${imageCurrentNo * -IMAGESLIDE_CONFIG.width}px, 0px, 0px`,
          }}
          imageCount={imageInfos.length}
          imageslide_config={IMAGESLIDE_CONFIG}
        >
          {imageInfos.map((image, index) => {
            return (
              <SlideContent key={index} imageslide_config={IMAGESLIDE_CONFIG}>
                <ImageWrapper>
                  <NoticeImage
                    src={`${image.imageUrl}`}
                    imageslide_config={IMAGESLIDE_CONFIG}
                    onClick={() => imageOnClick(image.linkUrl)}
                    pointable={image.linkUrl}
                  ></NoticeImage>
                </ImageWrapper>
              </SlideContent>
            );
          })}
        </SlideList>
        {imageInfos.length ? (
          <PrevButton onClick={prevOnClick} imageslide_config={IMAGESLIDE_CONFIG}>
            {'<'}
          </PrevButton>
        ) : null}
        {imageInfos.length ? (
          <NextButton onClick={nextOnClick} imageslide_config={IMAGESLIDE_CONFIG}>
            {'>'}
          </NextButton>
        ) : null}
        {deleteImage && imageInfos.length ? (
          <DeleteImageButton
            onClick={() => deleteImage()}
            imageslide_config={IMAGESLIDE_CONFIG}
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
  width: ${(props) => props.imageslide_config.width}px;
  height: ${(props) => props.imageslide_config.height}px;
  display: inline-block;
  background-color: white;
  border: 2px solid grey;
`;

const SlideList = styled.div`
  width: ${(props) => {
    return css`
        calc(${props.imageCount} * ${props.imageslide_config.width}px);
        `;
  }};
  height: ${(props) => props.imageslide_config.height}px;
  transition: all 300ms ease 0s;
  overflow: hidden;
`;

const SlideContent = styled.div`
  display: table;
  width: ${(props) => props.imageslide_config.width}px;
  height: ${(props) => props.imageslide_config.height}px;
  float: left;
`;

const ImageWrapper = styled.picture`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const NoticeImage = styled.img`
  width: ${(props) => props.imageslide_config.width}px;
  height: ${(props) => props.imageslide_config.height}px;
  cursor: ${(props) => (props.pointable === '' ? 'default' : 'pointer')};
`;

const NextButton = styled.button`
  position: absolute;
  top: 240px;
  right: -50px;
  width: 50px;
  height: 50px;
  padding-top: 5px;
  background-color: #333;
  font-size: 40px;
  font-weight: 100;
  line-height: 0px;
  color: #eeeeee;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 240px;
  left: -50px;
  width: 50px;
  height: 50px;
  padding-top: 5px;
  background-color: #333;
  font-size: 40px;
  font-weight: 100;
  line-height: 0px;
  color: #eeeeee;
`;

const DeleteImageButton = styled.button`
  position: absolute;
  left: ${(props) => (props.imageslide_config.width - 100) / 2}px;
  bottom: -50px;
  width: 100px;
  height: 50px;
  border: 0px;
  font-size: large;
  font-weight: bold;
  color: white;
  background-color: #cc0000;
  :hover {
    background-color: #b30000;
  }
`;

const NavBox = styled.div`
  position: absolute;
  top: -30px;
  left: ${(props) => (props.imageslide_config.width - 60) / 2}px;
  width: 60px;
  height: 30px;
  display: inline-block;
  border-radius: 20px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: white;
  background-color: darkgray;
  z-index: 1;
`;

const SlideBox = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  /* margin: auto; */
  overflow-x: hidden;
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

const OpenEditImageSlideButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 50px;
  width: 50px;
  display: ${(props) => (props.islogin ? 'visible' : 'none')};
  z-index: 1;
`;

export default ImageSlide;
