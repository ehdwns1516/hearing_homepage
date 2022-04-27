import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import SideNavBar from './SideNavBar';
import { useRecoilState } from 'recoil';
import StandardImageList from './StandardImageList';

import {
  postUploadImagesToS3,
  postInitDetailPage,
  getDetailPageImages,
  putDetailPageImages,
} from '../apis/APIs';

import { atomIsLogin } from '../recoils';

const ImgListPage = ({ topMenu, subMenu, type }) => {
  const imageInput = useRef(null);
  const selectedImage = useRef(null);
  const imageIsChanged = useRef(false);
  const imageIndex = useRef(0);
  const [contents, setContents] = useState(Array);
  const [editable, setEditable] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin);

  useEffect(() => {
    setEditable(false);
    getDetailPageImages(subMenu)
      .then((res) => {
        setContents(res.data.imageURLs);
      })
      .catch((err) => {
        if (err.response.status === 500)
          postInitDetailPage(subMenu)
            .then((res) => {
              console.log(res);
              return;
            })
            .catch((err) => console.log(err));
      });
  }, [subMenu]);

  useEffect(() => {
    if (!imageIsChanged.current) return;
    putDetailPageImages(subMenu, contents).catch((err) => console.log(err));
    imageIsChanged.current = false;
  }, [contents]);

  const imgInputBtnClick = (event, index) => {
    event.preventDefault();
    imageIndex.current = index;
    imageInput.current.click();
  };

  const editBtnClick = (event) => {
    event.preventDefault();
    setEditable(!editable);
  };

  const onChangeImage = (event) => {
    if (!event.target.files[0]) return;
    selectedImage.current = event.target.files[0];
    let data = new FormData();
    data.append('image', selectedImage.current);

    postUploadImagesToS3(data)
      .then((res) => {
        const afterContents = [...contents];
        afterContents.splice(imageIndex.current, 0, res.data.url);
        imageIsChanged.current = true;
        setContents(afterContents);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

        {editable ? (
          <EditButton islogin={isLogin} onClick={editBtnClick}>
            수정 완료
          </EditButton>
        ) : (
          <EditButton islogin={isLogin} onClick={editBtnClick}>
            수정
          </EditButton>
        )}
        {editable ? (
          <AddImageButton onClick={(e) => imgInputBtnClick(e, 0)}>
            이미지 추가
          </AddImageButton>
        ) : null}
        <StandardImageList
          editable={editable}
          images={[
            {
              img: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
              title: 'Breakfast',
            },
            {
              img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
              title: 'Burger',
            },
            {
              img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
              title: 'Camera',
            },
            {
              img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
              title: 'Coffee',
            },
            {
              img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
              title: 'Hats',
            },
            {
              img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
              title: 'Honey',
            },
            {
              img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
              title: 'Basketball',
            },
            {
              img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
              title: 'Fern',
            },
            {
              img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
              title: 'Mushrooms',
            },
            {
              img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
              title: 'Tomato basil',
            },
            {
              img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
              title: 'Sea star',
            },
            {
              img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
              title: 'Bike',
            },
            {
              img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
              title: 'Breakfast',
            },
            {
              img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
              title: 'Burger',
            },
            {
              img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
              title: 'Camera',
            },
            {
              img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
              title: 'Coffee',
            },
            {
              img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
              title: 'Hats',
            },
            {
              img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
              title: 'Honey',
            },
            {
              img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
              title: 'Basketball',
            },
            {
              img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
              title: 'Fern',
            },
            {
              img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
              title: 'Mushrooms',
            },
            {
              img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
              title: 'Tomato basil',
            },
            {
              img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
              title: 'Sea star',
            },
            {
              img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
              title: 'Bike',
            },
          ]}
        ></StandardImageList>
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
  width: calc(100% - 285px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
`;

const SideWrapper = styled.div`
  height: 100%;
  width: 285px;
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
  min-height: 40px;
  background-color: #009933;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 5px;
  border: 1px solid grey;
  color: white;
  :hover {
    background-color: #00802b;
  }
`;

const EditButton = styled.button`
  display: ${(props) => (props.islogin ? 'flow-root' : 'none')};
  width: 90%;
  height: 40px;
  min-height: 40px;
  background-color: #b4338a;
  font-weight: bold;
  font-size: 20px;
  color: white;
  border: 1px solid grey;
  margin-bottom: 5px;
  :hover {
    background-color: #892e6c;
  }
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

export default ImgListPage;
