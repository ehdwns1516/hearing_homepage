import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import SideNavBar from '../components/SideNavBar';
import { useRecoilState } from 'recoil';
import StandardImageList from '../components/StandardImageList';
import PreparingPage from '../components/Preparing';
import {
  postUploadImagesToS3,
  postInitDetailPage,
  getDetailPageImages,
  putDetailPageImages,
} from '../apis/APIs';

import { atomIsLogin, atomPageType } from '../recoils';
import { getColor } from '../utils';

const DetailPage = ({ topMenu, subMenu }) => {
  const imageInput = useRef(null);
  const selectedImage = useRef(null);
  const imageIsChanged = useRef(false);
  const imageIndex = useRef(0);
  const [contents, setContents] = useState(Array);
  const [editable, setEditable] = useState(false);
  const [type, setType] = useState(-1);
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin);
  const [pageType, setPageType] = useRecoilState(atomPageType);

  useEffect(() => {
    setEditable(false);
    getDetailPageImages(subMenu)
      .then((res) => {
        setContents(res.data.imageURLs);
        setType(pageType[subMenu]);
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
    imageIndex.current = index;
    imageInput.current.click();
  };

  const imgDeleteBtnClick = (event, index) => {
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
          <div style={{ overflow: 'visible', height: '0px' }}>
            <DeleteImageButton onClick={(e) => imgDeleteBtnClick(e, index)}>
              이미지 삭제
            </DeleteImageButton>
          </div>

          <ContentImg src={content} editable={editable} />
        </ImgWrapper>
        <AddImageButton onClick={(e) => imgInputBtnClick(e, index + 1)}>
          이미지 추가
        </AddImageButton>
      </React.Fragment>
    );
  };

  const ViewContents = (imageUrl, index) => {
    return (
      <React.Fragment key={index}>
        <ImgWrapper>
          <ContentImg src={imageUrl} editable={editable} />
        </ImgWrapper>
      </React.Fragment>
    );
  };

  return (
    <WholeWrapper>
      <ImageHiddenInput
        ref={imageInput}
        type='file'
        accept='image/*'
        onChange={onChangeImage}
      ></ImageHiddenInput>
      <SideWrapper>
        <SideNavBar currentPage={subMenu} />
      </SideWrapper>
      <ContentsWrapper>
        <TitleText>{topMenu}</TitleText>
        <HorizonLine>
          <InnerText>{subMenu}</InnerText>
        </HorizonLine>
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

        {contents.length === 0 ? <PreparingPage></PreparingPage> : null}

        {contents.length && type === 0
          ? contents.map((imageUrl, index) =>
              editable ? EditContents(imageUrl, index) : ViewContents(imageUrl, index)
            )
          : null}

        {contents.length && type === 1 ? (
          <StandardImageList
            editable={editable}
            allImages={contents}
            setAllImages={setContents}
            imageIsChanged={imageIsChanged}
          ></StandardImageList>
        ) : null}
      </ContentsWrapper>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TitleText = styled.span`
  margin-top: 30px;
  font-size: 30px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
  width: calc(100% - 285px);
  height: 100%;
`;

const SideWrapper = styled.div`
  text-align: center;
  width: 285px;
  height: 100%;
  border-right: 1px solid ${getColor('purple')};
`;

const HorizonLine = styled.div`
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${getColor('purple')};
  line-height: 0em;
`;

const InnerText = styled.span`
  padding: 0 10px;
  background-color: ${getColor('white')};
  color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
`;

const AddImageButton = styled.button`
  width: 90%;
  height: 40px;
  min-height: 40px;
  margin-bottom: 5px;
  border: 1px solid grey;
  background-color: ${getColor('green')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 20px;

  :hover {
    background-color: ${getColor('dark_green')};
  }
`;

const EditButton = styled.button`
  display: ${(props) => (props.islogin ? 'flow-root' : 'none')};
  width: 90%;
  height: 40px;
  min-height: 40px;
  margin-bottom: 5px;
  border: 1px solid grey;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 20px;
  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

const DeleteImageButton = styled.button`
  display: block;
  width: 120px;
  height: 60px;
  position: relative;
  top: 20px;
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: ${getColor('red')};
  color: ${getColor('white')};
  font-size: 20px;
  font-weight: bold;
  :hover {
    background-color: ${getColor('dark_red')};
  }
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

const ContentImg = styled.img`
  width: 80%;
  height: auto;
  margin-bottom: 5px;
  margin-left: ${(props) =>
    props.editable
      ? css`
          calc(5% - 80px);
        `
      : css`
          0px;
        `};
  object-fit: fill;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default DetailPage;