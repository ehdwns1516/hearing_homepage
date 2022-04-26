import React, { useState, useEffect, useRef } from 'react';
import StandardImageList from './StandardImageList';
import styled, { css } from 'styled-components';
import SideNavBar from './SideNavBar';
import { useRecoilState } from 'recoil';
import {
  postUploadImagesToS3,
  postInitDetailPage,
  getDetailPageImages,
  putDetailPageImages,
} from '../apis/APIs';

import { atomIsLogin } from '../recoils';

const ImgVerticalArrangePage = ({ topMenu, subMenu }) => {
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

  const imgDeleteBtnClick = (event, index) => {
    event.preventDefault();
    if (window.confirm('이미지를 정말 삭제하시겠습니까?')) {
      const afterContents = [...contents];
      afterContents.splice(index, 1);
      imageIsChanged.current = true;
      setContents(afterContents);
    }
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

  const EditContents = (content, index) => {
    return (
      <React.Fragment key={index}>
        <ImgWrapper>
          <DeleteImageButton onClick={(e) => imgDeleteBtnClick(e, index)}>
            X
          </DeleteImageButton>
          <ContentImg src={content} editable={editable} />
        </ImgWrapper>
        <AddImageButton onClick={(e) => imgInputBtnClick(e, index + 1)}>
          이미지 추가
        </AddImageButton>
      </React.Fragment>
    );
  };

  const ViewContents = (content, index) => {
    return (
      <React.Fragment key={index}>
        <ContentImg src={content} editable={editable} />
      </React.Fragment>
    );
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
        <StandardImageList images={[]}></StandardImageList>
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
        {contents.map((content, index) =>
          editable ? EditContents(content, index) : ViewContents(content, index)
        )}
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

const DeleteImageButton = styled.button`
  position: relative;
  align-self: flex-start;
  left: calc(5% + 10px);
  width: 80px;
  height: 80px;
  border: 1px solid grey;
  border-radius: 40px;
  background-color: #cc0000;
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-top: 10px;
  :hover {
    background-color: #b30000;
  }
  display: inline-block;
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

const ContentImg = styled.img`
  width: 90%;
  height: auto;
  margin-left: ${(props) =>
    props.editable
      ? css`
          calc(5% - 80px);
        `
      : css`
          0px;
        `};
  height: 100%;
  object-fit: fill;
  margin-bottom: 5px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export default ImgVerticalArrangePage;
