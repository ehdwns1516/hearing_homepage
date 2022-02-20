import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const ImageSlide = ({ images }) => {
  const [imageCurrentNo, setImageCurrentNo] = useState(0);

  const nextOnClick = () => {
    if (imageCurrentNo < images.length) setImageCurrentNo(imageCurrentNo + 1);
  };

  const prevOnClick = () => {
    if (imageCurrentNo > 0) setImageCurrentNo(imageCurrentNo - 1);
  };

  return (
    <WholeWrapper>
      <SlideBox>
        <NavBox>
          {imageCurrentNo} / {images.length}
        </NavBox>
        <SlideList
          style={{
            transform: `translate3d(
                ${imageCurrentNo * -500}px, 0px, 0px`,
          }}
        >
          {images.forEach((image, index) => {
            <SlideContent key={index}>
              <ImageWrapper>
                <NoticeImage src={`${image.imageUrl}`} color='red'></NoticeImage>
              </ImageWrapper>
            </SlideContent>;
          })}
        </SlideList>
        <PrevButton onClick={prevOnClick}>{'<'}</PrevButton>
        <NextButton onClick={nextOnClick}>{'>'}</NextButton>
      </SlideBox>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  width: 500px;
  height: 500px;
`;

const SlideList = styled.div`
  width: 1000px;
  height: auto;
  transition: all 300ms ease 0s;
  overflow: hidden;
`;

const SlideContent = styled.div`
  display: table;
  width: 500px;
  height: 500px;
  float: left;
`;

const ImageWrapper = styled.picture`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const NoticeImage = styled.img`
  width: 100%;
  height: 500px;
  background-color: ${(props) => props.color || 'black'};
`;

const NavBox = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 14px;
  z-index: 2;
`;

const NextButton = styled.button`
  position: absolute;
  top: 225px;
  right: -50px;
  width: 50px;
  height: 50px;
  padding-top: 5px;
  background-color: #333;
  font-size: 40px;
  font-weight: 100;
  vertical-align: middle;
  color: #eeeeee;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 225px;
  left: -50px;
  width: 50px;
  height: 50px;
  padding-top: 5px;
  background-color: #333;
  font-size: 40px;
  font-weight: 100;
  vertical-align: middle;
  color: #eeeeee;
`;

const SlideBox = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  margin: auto;
  overflow-x: hidden;
  &:hover ${NextButton} {
    right: 0;
    transition: right 0.5s;
  }
  &:hover ${PrevButton} {
    left: 0;
    transition: left 0.5s;
  }
`;

export default ImageSlide;
