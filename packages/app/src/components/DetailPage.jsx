import React, { useState, useEffect, useRef } from 'react';
import axios from '../apis/defaultAxios';
import styled from 'styled-components';

import SideNavBar from './SideNavBar';

const DetailPage = ({ topMenu, subMenu }) => {
  const imageInput = useRef(null);
  const selectedImage = useRef(null);
  const [contents, setContents] = useState(Array);

  useEffect(() => {}, []);

  const onImgInputBtnClick = (event, index) => {
    event.preventDefault();
    imageInput.current.click();
  };

  const onChangeImage = async (event) => {
    selectedImage.current = event.target.files[0];
  };

  return (
    <WholeWrapper>
      <SideWrapper>
        <SideNavBar currentPage={subMenu} />
      </SideWrapper>
      <ContentsWrapper>
        <TitleText>{topMenu}</TitleText>
        <HorizonLine>
          <InnerText>{subMenu}</InnerText>
        </HorizonLine>
        <ImageHiddenInput
          ref={imageInput}
          type='file'
          accept='image/*'
          onChange={onChangeImage}
        ></ImageHiddenInput>
        <AddImageButton onClick={(e) => onImgInputBtnClick(e, 0)}>
          이미지 추가
        </AddImageButton>
      </ContentsWrapper>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const ContentsWrapper = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SideWrapper = styled.div`
  height: 100%;
  width: 20%;
  min-width: 200px;
  border-right: 1px solid #b4338a;
  text-align: center;
  background-color: blue;
`;

const HorizonLine = styled.div`
  width: 90%;
  border-bottom: 1px solid #b4338a;
  line-height: 0em;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InnerText = styled.span`
  background-color: white;
  color: rgba(0, 0, 0, 0.5);
  padding: 0 10px;
  font-size: 20px;
`;

const TitleText = styled.span`
  font-size: 30px;
  margin-top: 50px;
`;

const AddImageButton = styled.button`
  width: 90%;
  height: 40px;
  background-color: lightgreen;
  font-weight: bold;
  font-size: 20px;
  border: 1px solid grey;
  :hover {
    background-color: green;
  }
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

export default DetailPage;
