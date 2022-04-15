import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const ImageSlide = ({
  imageInfos,
  imageCurrentNo,
  setImageCurrentNo,
  deleteImage = null,
}) => {
  const nextOnClick = () => {
    if (imageCurrentNo < imageInfos.length) setImageCurrentNo(imageCurrentNo + 1);
  };

  const prevOnClick = () => {
    if (imageCurrentNo > 1) setImageCurrentNo(imageCurrentNo - 1);
  };

  return (
    <WholeWrapper>
      <SlideBox>
        <NavBox>
          {imageInfos.length === 0 ? 0 : imageCurrentNo} / {imageInfos.length}
        </NavBox>
        <SlideList
          style={{
            transform: `translate3d(
                ${(imageCurrentNo - 1) * -1200}px, 0px, 0px`,
          }}
          imageCount={imageInfos.length}
        >
          {imageInfos.map((image, index) => {
            return (
              <SlideContent key={index}>
                <ImageWrapper>
                  <NoticeImage src={`${image.imageUrl}`}></NoticeImage>
                </ImageWrapper>
              </SlideContent>
            );
          })}
        </SlideList>
        {imageInfos.length ? <PrevButton onClick={prevOnClick}>{'<'}</PrevButton> : null}
        {imageInfos.length ? <NextButton onClick={nextOnClick}>{'>'}</NextButton> : null}
        {deleteImage && imageInfos.length ? (
          <DeleteImageButton onClick={() => deleteImage()}>삭제하기</DeleteImageButton>
        ) : null}
      </SlideBox>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  position: relative;
  top: 0px;
  width: 1200px;
  height: 530px;
  display: inline-block;
  background-color: white;
  border: 2px solid grey;
`;

const SlideList = styled.div`
  width: ${(props) => {
    return css`
        calc(${props.imageCount} * 1200px);
        `;
  }};
  height: auto;
  transition: all 300ms ease 0s;
  overflow: hidden;
`;

const SlideContent = styled.div`
  display: table;
  width: 1200px;
  height: 500px;
  float: left;
`;

const ImageWrapper = styled.picture`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const NoticeImage = styled.img`
  width: 1200px;
  height: auto;
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
  left: 450px;
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
  position: relative;
  top: -30px;
  width: 60px;
  height: 30px;
  display: inline-block;
  border-radius: 20px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: white;
  background-color: darkgray;
`;

const SlideBox = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  margin: auto;
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

export default ImageSlide;
